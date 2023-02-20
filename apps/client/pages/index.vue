<template>
  <div class="grid gap-5 overflow-x-auto p-4 md:p-20">
    <div class="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr] gap-5">
      <SearchInput
        :search="search"
        @update-search="updateSearch"
      />
      <Options
        label="Bank"
        :options="banks"
        :selected="bank"
        @update-field="updateBank"
      />
      <Options
        label="Category"
        :options="categories"
        :selected="category"
        @update-field="updateCategory"
      />
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-500">Start Date</label>
        <input
          v-model="from"
          type="date"
          class="overflow-hidden relative w-full h-10 outline-none rounded-lg bg-white p-2 shadow-md"
        >
      </div>
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-500">End Date</label>
        <input
          v-model="to"
          type="date"
          class="overflow-hidden relative w-full h-10 outline-none rounded-lg bg-white p-2 shadow-md"
        >
      </div>
    </div>
    <TransactionsTable :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransactions } from './useTransactions.vue';
import { useBanks } from './useBanks.vue';
import { useCategories } from './useCategories.vue';

const bank = ref<string>('');
const category = ref('');
const account = ref('');
const search = ref('');
const from = ref<string>(new Date('1901-01-01').toISOString());
const to = ref(new Date().toISOString());

const { transactions } = useTransactions({
  search: search as unknown as string,
  account: account as unknown as string,
  bank: bank as unknown as string,
  category: category as unknown as string,
  from,
  to,
});

const { banks } = useBanks();
const { categories } = useCategories();

const updateBank = (value: string) => (bank.value = value);
const updateCategory = (value: string) => (category.value = value);
const updateSearch = (value: string) => (search.value = value);
</script>
