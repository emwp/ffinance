<template>
  <table class="w-full text-sm text-left text-gray-500 shadow-md rounded-xl">
    <thead class="bg-gray-100">
      <tr>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Reference
        </th>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Category
        </th>
        <th
          scope="col"
          class="px-6 py-3"
        >
          Date
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-end w-32"
        >
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="tx in transactions"
        :key="tx?.id"
        class="cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <td
          v-if="tx?.reference"
          scope="row"
          class="px-6 py-4"
        >
          {{ tx?.reference }}
        </td>
        <td
          v-else
          scope="row"
          class="px-6 py-4"
        >
          No reference provided
        </td>
        <td class="px-6 py-4">
          <span
            class="p-2 text-black rounded-md"
            :style="{ backgroundColor: `${hexToRGBA(tx?.category?.color, 0.5)}` }"
          >
            {{ tx?.category?.name }}
          </span>
        </td>
        <td class="px-6 py-4">
          {{ tx?.date }}
        </td>
        <td class="px-6 py-4 text-end">
          {{ formatCurrency({ amount: tx?.amount, currency: tx?.currency, language: 'en-US' }) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { TransactionsQuery } from '~/config/graphql/graphql';
import hexToRGBA from '~/helpers/hexToRGBA';
import formatCurrency from '~/helpers/formatCurrency';

defineProps<{
  transactions?: TransactionsQuery['transactions'];
}>();
</script>
