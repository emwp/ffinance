<script lang="ts">
import { z } from 'zod';
import { graphql } from '~/config/graphql/gql';
import { TransactionsQueryVariables } from '~~/config/graphql/graphql';

const TxVariablesSchema = z.object({
  account: z.string().default(''),
  first: z.number().default(15),
  search: z.string().default(''),
  category: z.string().default(''),
  from: z.string().default(new Date('1901-01-01').toISOString()),
  to: z.string().default(new Date().toISOString()),
  orderBy: z.string().default('desc'),
  cursor: z.string().optional(),
});

export default function useTransactions(args: unknown) {
  /* Had problems with codegen generated graphql types and vue3 composition api.
     Tried to use zod to validate the args, but it didn't work either.
     If I pass the ref.value the query doesn't refetch on variables changes.
     And just the ref is invalid for the first render.
  */
  const parsedVariables = () =>
    TxVariablesSchema.safeParse(args) as {
      success: boolean;
      data: TransactionsQueryVariables;
    };

  const { result, loading } = useQuery(
    graphql(/* GraphQL */ `
      query Transactions(
        $account: String
        $first: Int
        $search: String
        $category: String
        $from: Date
        $to: Date
        $orderBy: String
        $cursor: String
      ) {
        transactions(
          account: $account
          first: $first
          search: $search
          category: $category
          from: $from
          to: $to
          orderBy: $orderBy
          cursor: $cursor
        ) {
          id
          reference
          amount
          currency
          date
          account {
            id
            name
            bank
          }
          category {
            id
            name
            color
          }
        }
      }
    `),
    { ...(args as TransactionsQueryVariables) },
    { fetchPolicy: 'cache-and-network' },
  );

  const transactions = computed(() => result?.value?.transactions);

  return { transactions, loading };
}
</script>
