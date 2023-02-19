import { DateScalar } from 'graphql-date-scalars';
import { getTransactions } from './transactions';
import { getCategories } from './categories';
import { getAccounts } from './accounts';
import { getBanks } from './banks';

const resolvers = {
  Date: DateScalar,
  Query: {
    transactions: async (_, args) => getTransactions(args),
    categories: async () => getCategories(),
    accounts: async () => getAccounts(),
    banks: async () => getBanks(),
  },
};

export default resolvers;
