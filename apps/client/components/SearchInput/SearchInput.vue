<template>
  <div class="relative w-full h-9">
    <input
      :value="search"
      class="w-full pl-8 outline-none cursor-default rounded-lg bg-white py-2 pr-10 text-left shadow-md"
      type="text"
      placeholder="Search by bank, account, reference, category, date, amount, currency"
      @input="$emit('updateSearch', ($event.target as HTMLInputElement).value)"
    >
    <span class="absolute px-2 inset-y-0 left-0 h-10 w-10">
      <MagnifyingGlassIcon class="h-full w-5 text-gray-400" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

defineProps<{
  search?: string;
}>();

defineEmits(['updateSearch']);
</script>
