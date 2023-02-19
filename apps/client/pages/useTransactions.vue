<script lang="ts">
import { TransactionsQueryVariables } from '~~/config/graphql/graphql';
import { graphql } from '../config/graphql/gql';

export function useTransactions(args: TransactionsQueryVariables) {
  const { result } = useQuery(
    graphql(/* GraphQL */ `
      query Transactions(
        $bank: String
        $account: String
        $first: Int
        $search: String
        $category: String
        $from: Date
        $to: Date
      ) {
        transactions(
          bank: $bank
          account: $account
          first: $first
          search: $search
          category: $category
          from: $from
          to: $to
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
    { ...args },
  );

  const transactions = computed(() => result?.value?.transactions || []);

  return { transactions };
}
</script>
