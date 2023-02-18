<template>
  <div>
    <p v-if="loadingBanks || loadingCategories || loadingTxs">
      Loading...
    </p>
    <div
      v-else
      class="grid grid-flow-col"
    >
      <div>
        <div
          v-for="bank in banks"
          :key="`${bank?.name}`"
        >
          <p>{{ bank?.name }}</p>
        </div>
      </div>
      <div>
        <div
          v-for="category in categories"
          :key="`${category?.name}`"
        >
          <p>{{ category?.name }}</p>
        </div>
      </div>
      <div>
        <div
          v-for="tx in txs"
          :key="`${tx?.id}`"
        >
          <p>{{ tx?.reference }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../config/graphql/gql';

const { result: banksResults, loading: loadingBanks } = useQuery(
  graphql(/* GraphQL */ `
    query Banks {
      banks {
        id
        name
      }
    }
  `),
);

const { result: categoriesResults, loading: loadingCategories } = useQuery(
  graphql(/* GraphQL */ `
    query Categories {
      categories {
        id
        name
      }
    }
  `),
);

const { result: txResults, loading: loadingTxs } = useQuery(
  graphql(/* GraphQL */ `
    query Transactions($search: String) {
      transactions(search: $search) {
        id
        reference
        account
        bank {
          id
          name
        }
        categories {
          id
          name
        }
        currency
        date
      }
    }
  `),
  { search: '' },
);

const banks = computed(() => banksResults?.value?.banks);
const categories = computed(() => categoriesResults?.value?.categories);
const txs = computed(() => txResults?.value?.transactions);
</script>
