import prisma from '../../../prisma/client';
import { z } from 'zod';
import isValidDate from '../../../helpers/isValidDate';
import isValidAmount from '../../../helpers/isValidAmount';

const START_DATE_STRING = '1901-01-01';

const QueryInputSchema = z.object({
  account: z.string().optional(),
  amount: z.number().optional(),
  bank: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  search: z.string().optional(),
});

const getTransactions = async (args: z.infer<typeof QueryInputSchema>) => {
  const { account, bank, to, from, search = '' } = QueryInputSchema.parse(args) ?? {};

  const searchORconditions: { [key: string]: unknown }[] = [
    { reference: { contains: search, mode: 'insensitive' } },
    { account: { contains: search, mode: 'insensitive' } },
    { category: { name: { contains: search, mode: 'insensitive' } } },
    { account: { contains: search, mode: 'insensitive' } },
    { bank: { name: { contains: search, mode: 'insensitive' } } },
    { currency: { equals: search, mode: 'insensitive' } },
  ];

  if (isValidDate(search)) {
    searchORconditions.push({ date: { gte: new Date(search ?? START_DATE_STRING) } });
  }

  if (isValidAmount(search)) {
    const amount = parseFloat(search) * 100;
    searchORconditions.push({ amount: { equals: amount } });
  }

  return await prisma.transaction.findMany({
    where: {
      OR: searchORconditions,
      AND: [
        { account: { contains: account, mode: 'insensitive' } },
        { bank: { name: { contains: bank, mode: 'insensitive' } } },
        { date: { gte: new Date(from ?? START_DATE_STRING), lte: to ? new Date(to) : new Date() } },
      ],
    },
    include: {
      category: { select: { name: true, id: true } },
      bank: { select: { name: true, id: true } },
    },
  });
};

export { getTransactions };
