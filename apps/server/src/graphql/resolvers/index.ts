import { DateScalar } from 'graphql-date-scalars';
import GraphQLDecimal from 'graphql-type-decimal';
import { findById, findMany } from './transactions';
import { findCategories, updateCategory } from './categories';
import { findAccounts } from './accounts';
import { findBanks } from './banks';
import { Resolvers } from '../resolvers-types';

const resolvers: Resolvers = {
  Date: DateScalar,
  Decimal: GraphQLDecimal,
  Query: {
    transactions: async (_, args) => findMany(args),
    findTransactionById: async (_, args) => findById(args),
    categories: async () => findCategories(),
    accounts: async () => findAccounts(),
    banks: async () => findBanks(),
  },
  Mutation: {
    updateCategory: async (_, args) => updateCategory(args),
  },
};

export default resolvers;
