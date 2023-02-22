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
          data-testid="input-category-name"
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
            data-testid="input-category-color"
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
    <div
      v-if="isToastVisible.isVisible"
      class="flex justify-center items-center fixed right-2 top-2 p-4 h-max w-max rounded-lg"
      :class="{
        'bg-green-300': isToastVisible.type === 'success',
        'bg-red-300': isToastVisible.type === 'error',
      }"
    >
      <span class="font-medium text-gray-700">{{ isToastVisible.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTransaction from '~/graphql/queries/useTransaction.vue';
import useUpdateCategory from '~/graphql/mutations/useUpdateCategory.vue';
import formatCurrency from '~/helpers/formatCurrency';

type Toast = {
  isVisible?: boolean;
  type?: 'success' | 'error';
  message?: string;
};

const { params } = useRoute();
const txId = params.transaction.toString();
const { transaction } = useTransaction({ txId });

const { upsertCategory } = useUpdateCategory();

const categoryNameRef = ref<string>();
const categoryColorRef = ref<string>();
const isToastVisible = ref<Toast>({ isVisible: false, type: 'success' });

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
  const { errors } = (await upsertCategory({ categoryId: catId, color: catColor, name: catName })) ?? {};

  isToastVisible.value.isVisible = true;

  if (!errors?.length) {
    isToastVisible.value.type = 'success';
    isToastVisible.value.message = 'Category updated!';
  } else {
    isToastVisible.value.type = 'error';
    isToastVisible.value.message = 'Something went wrong!';
  }
  return setTimeout(() => {
    isToastVisible.value.isVisible = false;
  }, 3000);
};
</script>
