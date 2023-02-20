import { z } from 'zod';
import prisma from '../../../prisma/client';

const QueryInputSchema = z.object({
  txId: z.string(),
});

const findById = async (args: z.infer<typeof QueryInputSchema>) => {
  return (
    (await prisma.transactions.findFirst({
      include: { account: true, category: true },
      where: { id: { equals: args.txId } },
    })) ?? {}
  );
};

export { findById };
