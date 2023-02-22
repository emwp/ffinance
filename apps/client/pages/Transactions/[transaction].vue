<template>
  <div class="bg-white shadow rounded-md">
    <div class="p-4">
      <h2 class="text-lg font-medium">
        Transaction ID: {{ transaction?.id }}
      </h2>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-4 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm"> Refence: </span>
        <span class="text-sm"> {{ transaction?.reference }} </span>
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-2 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm py-2"> Category: </span>
        <input
          v-model="categoryNameRef"
          class="outline-none h-9 p-2 w-auto max-w-[284px] rounded-lg bg-white shadow-md"
          type="text"
        >
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-2 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm py-2"> Category Color: </span>
        <div class="grid grid-cols-2 gap-3 w-max place-items-center">
          <input
            v-model="categoryColorRef"
            class="outline-none h-9 p-2 w-auto max-w-[284px] rounded-lg bg-white shadow-md"
            type="text"
          >
        </div>
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-4 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm"> Bank: </span>
        <span class="text-sm"> {{ transaction?.account.bank }} </span>
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-4 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm"> Account: </span>
        <span class="text-sm"> {{ transaction?.account.name }} </span>
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-4 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm"> Amount: </span>
        <span class="text-sm">
          {{ formatCurrency({ currency: transaction?.currency, amount: transaction?.amount }) }}
        </span>
      </div>
    </div>

    <div class="border-gray-200">
      <div class="bg-gray-50 p-4 grid grid-cols-2 gap-4 sm:px-6">
        <span class="text-sm"> Date: </span>
        <span class="text-sm"> {{ transaction?.date }} </span>
      </div>
    </div>

    <div class="grid grid-rows-2 gap-2 p-2">
      <button
        class="w-full bg-teal-300/40 p-2 rounded-md text-gray-600 font-semibold"
        @click="updateCategory"
      >
        Update
      </button>
      <NuxtLink
        class="flex justify-center cursor-pointer bg-gray-300/50 p-2 rounded-md text-gray-600 font-semibold"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTransaction from '~/graphql/queries/useTransaction.vue';
import useUpdateCategory from '~/graphql/mutations/useUpdateCategory.vue';
import formatCurrency from '~/helpers/formatCurrency';

const { params } = useRoute();
const txId = params.transaction.toString();
const { transaction } = useTransaction({ txId });

const { upsertCategory } = useUpdateCategory();

const categoryNameRef = ref<string>();
const categoryColorRef = ref<string>();

watch(transaction, (newTx) => {
  categoryNameRef.value = newTx?.category.name;
  categoryColorRef.value = newTx?.category.color;
});

const updateCategory = async () => {
  const catId = transaction.value?.category.id;
  const catColor = categoryColorRef.value;
  const catName = categoryNameRef.value;
  if (typeof catColor !== 'string' || typeof catName !== 'string') {
    return;
  }
  await upsertCategory({ categoryId: catId, color: catColor, name: catName });
};
</script>
