import { DateScalar } from 'graphql-date-scalars';
import { getTransactions } from './transactions';
import { getCategories } from './categories';
import { getBanks } from './banks';

const resolvers = {
  Date: DateScalar,
  Query: {
    transactions: async (_, args) => getTransactions(args),
    categories: async () => getCategories(),
    banks: async () => getBanks(),
  },
};

export default resolvers;
