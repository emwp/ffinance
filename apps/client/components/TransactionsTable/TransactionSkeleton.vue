<template>
  <div class="rounded-md p-4 w-full mx-auto">
    <div class="animate-pulse">
      <div class="grid grid-flow-row gap-4">
        <div
          v-for="element in iterable"
          :key="element"
          class="h-10 bg-gray-200/50 rounded"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  size: number;
}>();

const iterable = computed(() =>
  Array(props.size)
    .fill(null)
    .map((_, i) => i),
);
</script>
