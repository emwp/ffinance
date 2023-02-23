import { Prisma } from '@prisma/client';
import isValidAmount from '../../../../helpers/isValidAmount';
import isValidDate from '../../../../helpers/isValidDate';
import { QueryTransactionsArgs } from '../../../resolvers-types';
import { validateTxsInput } from './inputValidator';

type PrismaWhere = Prisma.Enumerable<Prisma.TransactionWhereInput>;

const START_DATE_STRING = '1901-01-01';

const buildWhereArgs = (args: QueryTransactionsArgs) => {
  const AND: PrismaWhere = [];
  const OR: PrismaWhere = [];
  const { search, category, account, bank, from, to } = validateTxsInput(args);
  const hasDate = from || to;

  Object.keys(args).forEach((key) => {
    if (key === 'search' && search.length) {
      if (isValidDate(search)) {
        OR.push({
          date: { gte: new Date(search ?? START_DATE_STRING) },
        });
      }
      if (isValidAmount(search)) {
        const amount = parseFloat(search) * 100;
        OR.push({ amount: { equals: amount } });
      }
      OR.push({
        reference: { contains: search, mode: 'insensitive' },
      });
      OR.push({
        account: { name: { contains: search, mode: 'insensitive' } },
      });
      OR.push({
        account: { bank: { contains: search, mode: 'insensitive' } },
      });
      OR.push({
        category: { name: { contains: search, mode: 'insensitive' } },
      });
      OR.push({ currency: { equals: search, mode: 'insensitive' } });
    } else if (key === 'category' && category?.length) {
      AND.push({
        category: { name: { contains: category, mode: 'insensitive' } },
      });
    } else if (key === 'account' && account?.length) {
      AND.push({
        account: { name: { contains: account, mode: 'insensitive' } },
      });
    } else if (key === 'bank' && bank?.length) {
      AND.push({
        account: { bank: { contains: bank, mode: 'insensitive' } },
      });
    } else if (hasDate && (key === 'from' || key === 'to')) {
      AND.push({
        date: {
          gte: new Date(from ?? START_DATE_STRING),
          lte: to ? new Date(to) : new Date(),
        },
      });
    }
  });

  return { OR, AND };
};

export { buildWhereArgs };
