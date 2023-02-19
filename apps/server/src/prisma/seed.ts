import { createReadStream, readFileSync } from 'fs';
import { parse } from 'csv-parse';
import { join } from 'path';
import prisma from './client';
import { PrismaClient } from '@prisma/client';

async function main() {
  await createReadStream(join(process.cwd(), './src/prisma/data/accounts.csv'))
    .pipe(parse({ delimiter: ',', from_line: 2, quote: '' }))
    .on('data', async function (row: string[]) {
      const [id, name, bank] = row.map((item) => item.replace(/"/g, ''));
      return await prisma.accounts.create({ data: { id, name, bank } });
    });

  await createReadStream(
    join(process.cwd(), './src/prisma/data/categories.csv'),
  )
    .pipe(parse({ delimiter: ',', from_line: 2, relaxQuotes: true }))
    .on('data', async function (row: string[]) {
      const [id, name, color] = row.map((item) => item.replace(/"/g, ''));
      return await prisma.categories.create({ data: { id, name, color } });
    });

  await createReadStream(
    join(process.cwd(), './src/prisma/data/transactions.csv'),
  )
    .pipe(parse({ delimiter: ',', from_line: 2, relaxQuotes: true }))
    .on('data', async function (row: string[]) {
      if (row.length === 7) {
        const [id, accountId, categoryId, reference, amount, currency, date] =
          row.map((item) => item.replace(/"/g, '').trim());
        if (id && accountId && categoryId) {
          return await prisma.transactions.createMany({
            data: {
              id,
              accountId,
              categoryId,
              reference,
              amount: parseFloat(amount),
              currency,
              date: new Date(date),
            },
          });
        }
      }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
