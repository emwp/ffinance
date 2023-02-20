<script lang="ts">
import { graphql } from '../../config/graphql/gql';

export function useCategories() {
  const { result } = useQuery(
    graphql(`
      query Categories {
        categories {
          name
        }
      }
    `),
  );

  const categories = computed(() => result?.value?.categories?.map((category) => category?.name) ?? []);

  return { categories };
}
</script>
