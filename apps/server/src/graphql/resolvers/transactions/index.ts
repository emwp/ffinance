import { z } from 'zod';
import prisma from '../../../prisma/client';
import isValidDate from '../../../helpers/isValidDate';
import isValidAmount from '../../../helpers/isValidAmount';

const START_DATE_STRING = '1901-01-01';

const QueryInputSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  account: z.string().optional(),
  bank: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  first: z.number().optional(),
});

const getTransactions = async (args: z.infer<typeof QueryInputSchema>) => {
  const {
    account,
    category,
    to,
    from,
    bank,
    search = '',
    first = 100,
  } = QueryInputSchema.parse(args) ?? {};

  const searchORconditions: { [key: string]: unknown }[] = [
    { reference: { contains: search, mode: 'insensitive' } },
    { account: { name: { contains: search, mode: 'insensitive' } } },
    { account: { bank: { contains: search, mode: 'insensitive' } } },
    { category: { name: { contains: search, mode: 'insensitive' } } },
    { currency: { equals: search, mode: 'insensitive' } },
  ];

  if (isValidDate(search)) {
    searchORconditions.push({
      date: { gte: new Date(search ?? START_DATE_STRING) },
    });
  }

  if (isValidAmount(search)) {
    const amount = parseFloat(search) * 100;
    searchORconditions.push({ amount: { equals: amount } });
  }

  return await prisma.transactions.findMany({
    include: {
      category: { select: { name: true, color: true, id: true } },
      account: { select: { name: true, bank: true, id: true } },
    },
    where: {
      OR: searchORconditions,
      AND: [
        { account: { bank: { contains: bank, mode: 'insensitive' } } },
        { account: { name: { contains: account, mode: 'insensitive' } } },
        { category: { name: { contains: category, mode: 'insensitive' } } },
        {
          date: {
            gte: new Date(from ?? START_DATE_STRING),
            lte: to ? new Date(to) : new Date(),
          },
        },
      ],
    },
    take: first,
  });
};

export { getTransactions };
