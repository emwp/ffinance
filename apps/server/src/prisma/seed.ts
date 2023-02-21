import { createReadStream, readFileSync } from 'fs';
import { parse } from 'csv-parse';
import { join } from 'path';
import prisma from './client';

const startTime = Date.now();

console.log('🌱 DB Seeding started, may take some time...');

const interval = setInterval(() => {
  const msElapsed = Date.now() - startTime;
  console.log(`⏳ DB Seeding in progress... Elapsed: ${msElapsed}ms`);
}, 10000);

async function main() {
  // Seed accounts
  await new Promise((resolve, reject) => {
    createReadStream(join(process.cwd(), './src/prisma/data/accounts.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, quote: '' }))
      .on('data', async function (row: string[]) {
        const [id = '', name = '', bank = ''] = row?.map((item) =>
          item?.replace(/"/g, ''),
        );
        if (!id || !name) return;
        return await prisma.account.create({ data: { id, name, bank } });
      })
      .on('end', () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  // Seed categories
  await new Promise((resolve, reject) => {
    createReadStream(join(process.cwd(), './src/prisma/data/categories.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, relaxQuotes: true }))
      .on('data', async function (row: string[]) {
        const [id = '', name = '', color = ''] = row?.map((item) =>
          item?.replace(/"/g, ''),
        );
        if (!id || !name) return;
        return await prisma.category.create({ data: { id, name, color } });
      })
      .on('end', () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  // Seed transactions
  await new Promise((resolve, reject) => {
    createReadStream(join(process.cwd(), './src/prisma/data/transactions.csv'))
      .pipe(parse({ delimiter: ',', from_line: 2, relaxQuotes: true }))
      .on('data', async function (row: string[]) {
        if (row?.length === 7) {
          const [id, accountId, categoryId, reference, amount, currency, date] =
            row?.map((item) => item?.replace(/"/g, '').trim());
          if (id && accountId && categoryId) {
            return await prisma.transaction.createMany({
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
      })
      .on('end', () => {
        resolve(true);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    clearInterval(interval);
    console.log('🌱 DB Seeding endend!');
    console.log(`⏳ Seed completed in ${Date.now() - startTime}ms ⌛`);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
