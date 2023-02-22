<script lang="ts">
import { graphql } from '../../config/graphql/gql';

export default function useCategories() {
  const { result } = useQuery(
    graphql(`
      query Categories {
        categories {
          name
        }
      }
    `),
    {},
    { fetchPolicy: 'cache-and-network' },
  );

  const categories = computed(() => result?.value?.categories?.map((category) => category?.name) ?? []);

  return { categories };
}
</script>
