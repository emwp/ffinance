<script lang="ts">
import { graphql } from '../config/graphql/gql';

export function useBanks() {
  const { result } = useQuery(
    graphql(`
      query Banks {
        banks {
          id
          name
        }
      }
    `),
  );

  const banks = computed(() => result?.value?.banks?.map((bank) => bank?.name) ?? []);

  return { banks };
}
</script>
