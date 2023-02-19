<script lang="ts">
import { graphql } from '../config/graphql/gql';

export function useBanks() {
  const { result } = useQuery(
    graphql(`
      query Accounts {
        accounts {
          id
          name
          bank
        }
      }
    `),
  );

  const banks = computed(() => result?.value?.accounts?.map((bank) => bank?.name) ?? []);

  return { banks };
}
</script>
