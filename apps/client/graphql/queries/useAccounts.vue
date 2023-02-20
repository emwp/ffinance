<script lang="ts">
import { graphql } from '../../config/graphql/gql';

export function useAccounts() {
  const { result } = useQuery(
    graphql(`
      query Accounts {
        accounts {
          name
        }
      }
    `),
  );

  const accounts = computed(() => result?.value?.accounts?.map((bank) => bank?.name) ?? []);
  return { accounts };
}
</script>
