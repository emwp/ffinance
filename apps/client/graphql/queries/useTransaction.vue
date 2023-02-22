<script lang="ts">
import { graphql } from '~/config/graphql/gql';

type Args = { txId?: string };

export default function useTransaction({ txId }: Args) {
  const { result, loading } = useQuery(
    graphql(/* GraphQL */ `
      query FindTransactionById($txId: ID) {
        findTransactionById(txId: $txId) {
          id
          date
          category {
            id
            name
            color
          }
          amount
          account {
            id
            name
            bank
          }
          currency
          reference
        }
      }
    `),
    { txId },
    { enabled: !!txId?.length, fetchPolicy: 'cache-and-network' },
  );

  const transaction = computed(() => result?.value?.findTransactionById);

  return { transaction, loading };
}
</script>
