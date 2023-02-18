<template>
  <div>
    <button
      v-if="!show"
      @click="show = true"
    >
      Show List
    </button>
    <h1>Hello World</h1>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
</script>
