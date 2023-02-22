<script lang="ts">
import { graphql } from '../../config/graphql/gql';

export default function useUpdateCategory() {
  const { mutate: upsertCategory, loading } = useMutation(
    graphql(`
      mutation UpdateCategory($categoryId: ID, $name: String!, $color: String!) {
        updateCategory(categoryId: $categoryId, name: $name, color: $color) {
          color
          id
          name
        }
      }
    `),
  );

  return { upsertCategory, loading };
}
</script>
