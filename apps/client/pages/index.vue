<template>
  <div class="p-4 bg-gray-50 rounded-xl h-full">
    <div class="grid gap-5 overflow-x-auto">
      <div class="grid grid-cols-[2fr,1fr,1fr,0.5fr,0.5fr] gap-5">
        <SearchInput
          :search="search"
          @update-search="updateSearch"
        />
        <Options
          label="Account"
          :options="accounts"
          :selected="account"
          @update-field="updateAccount"
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
      <div
        v-if="loading"
        class="w-full sm:h-[50vh] m-auto grid sm:place-items-center"
      >
        <TransactionSkeleton />
      </div>
      <TransactionsTable
        v-else
        :transactions="transactions"
        push-route="/transactions"
        :is-order-desc="isOrderDesc"
        @update-order="updateOrderBy"
      />
    </div>
    <div
      v-if="!loading"
      class="grid gap-2 grid-cols-2 w-max m-auto mt-5"
    >
      <button
        :disabled="!cursor?.length"
        class="bg-gray-200 w-max p-2 rounded-md font-medium text-sm"
        :class="!cursor?.length && 'disabled:opacity-50'"
        @click="firstPage"
      >
        First Page
      </button>
      <button
        class="bg-gray-200 w-max p-2 rounded-md font-medium text-sm"
        @click="nextPage"
      >
        Next Page
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransactions } from '~/graphql/queries/useTransactions.vue';
import { useAccounts } from '~~/graphql/queries/useAccounts.vue';
import { useCategories } from '~/graphql/queries/useCategories.vue';
import TransactionSkeleton from '~~/components/Skeletons/TransactionSkeleton.vue';

const category = ref('');
const account = ref('');
const search = ref('');
const cursor = ref<string>();
const orderBy = ref('desc');
const from = ref<string>(new Date('1901-01-01').toISOString());
const to = ref(new Date().toISOString());

const { transactions, loading, refetch } = useTransactions({
  search: search as unknown as string,
  account: account as unknown as string,
  category: category as unknown as string,
  orderBy: orderBy as unknown as string,
  cursor: cursor as unknown as string | undefined,
  from,
  to,
});

const { accounts } = useAccounts();
const { categories } = useCategories();

const updateAccount = (value: string) => {
  cursor.value = undefined;
  account.value = value;
};
const updateCategory = (value: string) => {
  cursor.value = undefined;
  category.value = value;
};

const updateSearch = (value: string) => {
  cursor.value = undefined;
  search.value = value;
};

const updateOrderBy = () => {
  cursor.value = undefined;
  if (orderBy.value === 'desc') {
    return (orderBy.value = 'asc');
  }
  orderBy.value = 'desc';
};

watch(from, () => (cursor.value = undefined));
watch(to, () => (cursor.value = undefined));

// watch(orderBy, (order) => {
//   refetch({
//     search: search as unknown as string,
//     account: account as unknown as string,
//     category: category as unknown as string,
//     orderBy: order,
//     cursor: cursor as unknown as string | undefined,
//     from,
//     to,
//     first: 15,
//   });
// });

const isOrderDesc = computed(() => orderBy.value === 'desc');

const nextPage = () => {
  cursor.value = transactions?.value?.[transactions?.value?.length - 1]?.id;
};

const firstPage = () => {
  cursor.value = undefined;
};
</script>
