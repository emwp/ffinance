import { QueryTransactionsArgs } from '../../../resolvers-types';
import { z } from 'zod';

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

const validateTxsInput = (args: QueryTransactionsArgs) => {
  return TransactionsInputSchema.parse(args);
};

export { validateTxsInput };
