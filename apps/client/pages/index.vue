<template>
  <div class="mt-20 grid w-screen m-auto place-items-center gap-5">
    <div class="grid w-screen m-auto place-items-center grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr] gap-5 max-w-max h-max">
      <SearchInput
        :search="search"
        @update-search="updateSearch"
      />
      <Options
        :options="banks"
        :selected="bank"
        @update-field="updateBank"
      />
      <Options
        :options="categories"
        :selected="category"
        @update-field="updateCategory"
      />
      <input
        v-model="from"
        type="date"
        class="overflow-hidden relative w-full outline-none cursor-default rounded-lg bg-white p-2 shadow-md"
      >
      <input
        v-model="to"
        type="date"
        class="overflow-hidden relative w-full outline-none cursor-default rounded-lg bg-white p-2 shadow-md"
      >
    </div>
    <div class="max-h-max">
      <div
        v-for="tx in txs"
        :key="tx?.id"
      >
        <p>{{ tx?.reference }}</p>
      </div>
    </div>
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

const { transactions: txs } = useTransactions({
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
