import { z } from 'zod';
import prisma from '../../../prisma/client';
import isValidDate from '../../../helpers/isValidDate';
import isValidAmount from '../../../helpers/isValidAmount';
import { Prisma } from '@prisma/client';

const START_DATE_STRING = '1901-01-01';

const QueryInputSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  account: z.string().optional(),
  bank: z.string().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  first: z.number().optional(),
  cursor: z.string().optional(),
  orderBy: z.string().optional(),
});

const findMany = async (args: z.infer<typeof QueryInputSchema>) => {
  const {
    account,
    category,
    to,
    from,
    bank,
    cursor,
    orderBy,
    search = '',
    first = 15,
  } = QueryInputSchema.parse(args) ?? {};

  console.log({ search });

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
