<template>
  <div>
    <p v-if="loading">
      Loading...
    </p>
    <div
      v-for="country in countries"
      v-else
      :key="country.code"
      class="grid grid-flow-col w-max gap-1"
    >
      <p>{{ country.code }}</p>
      <p>{{ country.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { graphql } from '../config/graphql/gql';

const { result, loading } = useQuery(
  graphql(/* GraphQL */ `
    query getCountries {
      countries {
        name
        code
      }
    }
  `),
);

const countries = computed(() => result?.value?.countries);
</script>
