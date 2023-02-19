<script lang="ts">
import { TransactionsQueryVariables } from '~~/config/graphql/graphql';
import { graphql } from '../config/graphql/gql';

export function useTransactions(args: TransactionsQueryVariables) {
  const { result } = useQuery(
    graphql(/* GraphQL */ `
      query Transactions($search: String, $category: String, $bank: String, $account: String, $from: Date, $to: Date) {
        transactions(search: $search, category: $category, bank: $bank, account: $account, from: $from, to: $to) {
          id
          reference
          account
          amount
          currency
          bank {
            name
          }
          categories {
            name
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
