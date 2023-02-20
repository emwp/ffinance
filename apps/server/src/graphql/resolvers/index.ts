import { DateScalar } from 'graphql-date-scalars';
import { findById, findMany } from './transactions';
import { getCategories, updateCategory } from './categories';
import { getAccounts } from './accounts';
import { getBanks } from './banks';

const resolvers = {
  Date: DateScalar,
  Query: {
    transactions: async (_, args) => findMany(args),
    findTransactionById: async (_, args) => findById(args),
    categories: async () => getCategories(),
    accounts: async () => getAccounts(),
    banks: async () => getBanks(),
  },
  Mutation: {
    updateCategory: async (_, args) => updateCategory(args),
  },
};

export default resolvers;
