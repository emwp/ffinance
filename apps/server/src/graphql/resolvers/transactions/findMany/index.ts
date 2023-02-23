import prisma from '../../../../../prisma/client';
import { Prisma } from '@prisma/client';
import { QueryTransactionsArgs } from '../../../resolvers-types';
import { validateTxsInput } from './inputValidator';
import { buildWhereArgs } from './buildWhereArgs';

const findMany = async (args: QueryTransactionsArgs) => {
  const { first, cursor, search, orderBy } = validateTxsInput(args);
  const { AND, OR } = buildWhereArgs(args);

  const txs = await prisma.transaction.findMany({
    where: {
      OR: OR.length ? OR : undefined,
      AND: AND.length ? AND : undefined,
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

  return txs;
};

export { findMany };
