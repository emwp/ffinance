<template>
  <table class="w-full min-h-[240px] text-sm text-left text-gray-500 shadow-md rounded-xl">
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
          @click="$emit('updateOrder')"
        >
          <div class="flex">
            <span>Date</span>
            <ChevronDownIcon
              v-if="isOrderDesc"
              class="h-5 w-5 text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
            <ChevronUpIcon
              v-else
              class="h-5 w-5 text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
          </div>
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
        @click="goToTxDetails(tx?.id)"
      >
        <td
          v-if="tx?.reference"
          scope="row"
          class="px-6 py-4 w-[30%]"
        >
          {{ tx?.reference }}
        </td>
        <td
          v-else
          scope="row"
          class="px-6 py-4 w-[30%]"
        >
          No reference provided
        </td>
        <td class="px-6 py-4 w-[30%]">
          <span
            class="p-2 text-black rounded-md"
            :style="{ backgroundColor: `${hexToRGBA(tx?.category?.color, 0.5)}` }"
          >
            {{ tx?.category?.name }}
          </span>
        </td>
        <td class="px-6 py-4 w-[20%]">
          {{ tx?.date }}
        </td>
        <td class="px-6 py-4 text-end w-[20%]">
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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

const { push } = useRouter();

const props = defineProps<{
  transactions?: TransactionsQuery['transactions'];
  pushRoute?: string;
  isOrderDesc: boolean;
}>();

defineEmits(['updateOrder']);

const goToTxDetails = (txId?: string) => push(`${props.pushRoute}/${txId}`);
</script>
