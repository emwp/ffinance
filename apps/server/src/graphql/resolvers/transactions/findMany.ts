import { z } from 'zod';
import prisma from '../../../../prisma/client';
import isValidDate from '../../../helpers/isValidDate';
import isValidAmount from '../../../helpers/isValidAmount';
import { Prisma } from '@prisma/client';
import { QueryTransactionsArgs } from '../../resolvers-types';

const START_DATE_STRING = '1901-01-01';

const TransactionsInputSchema = z.object({
  search: z.string().default(''),
  category: z.string().optional(),
  account: z.string().optional(),
  bank: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  first: z.number().default(15),
  cursor: z.string().optional(),
  orderBy: z.string().optional(),
});

const findMany = async (args: QueryTransactionsArgs) => {
  const { account, category, to, from, bank, cursor, orderBy, search, first } =
    TransactionsInputSchema.parse(args) ?? {};

  const searchORconditions: Prisma.Enumerable<Prisma.TransactionWhereInput> = [
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

  return await prisma.transaction.findMany({
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
    include: {
      category: { select: { name: true, color: true, id: true } },
      account: { select: { name: true, bank: true, id: true } },
    },
    orderBy: { date: orderBy as Prisma.SortOrder },
    take: first,
    skip: cursor?.length ? 1 : undefined,
    cursor: cursor?.length ? { id: cursor } : undefined,
  });
};

export { findMany };
