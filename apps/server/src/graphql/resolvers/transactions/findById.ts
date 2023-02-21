import { z } from 'zod';
import prisma from '../../../prisma/client';
import { QueryFindTransactionByIdArgs } from '../../resolvers-types';

const TransactionInputSchema = z.object({
  txId: z.string().min(1, { message: 'Transaction ID is required' }),
});

const findById = async (args: QueryFindTransactionByIdArgs) => {
  const { txId } = TransactionInputSchema.parse(args);

  return await prisma.transaction.findFirst({
    include: { account: true, category: true },
    where: { id: { equals: txId } },
  });
};

export { findById };
