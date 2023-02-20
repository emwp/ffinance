<script lang="ts">
import { TransactionsQueryVariables } from '~~/config/graphql/graphql';
import { graphql } from '../../config/graphql/gql';

export function useTransactions(args: TransactionsQueryVariables) {
  if (typeof args.category !== 'string') {
    console.log({ args });
  }

  const { result, loading, refetch } = useQuery(
    graphql(/* GraphQL */ `
      query Transactions(
        $bank: String
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
          bank: $bank
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
    { ...args, first: 15 },
    { fetchPolicy: 'no-cache' },
  );

  const transactions = computed(() => result?.value?.transactions || []);

  return { transactions, loading, refetch };
}
</script>
