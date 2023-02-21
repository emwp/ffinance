<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-500">{{ label }}</label>
    <Listbox
      :value="current"
      @input="$emit('updateField', ($event.target as HTMLInputElement).value)"
    >
      <div class="relative mt-1">
        <ListboxButton
          :data-testid="[`Options-${label}`]"
          class="relative w-full h-10 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md"
        >
          <span class="block truncate">{{ current }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <BackspaceIcon
              v-if="current"
              class="h-5 w-5 text-gray-400 mr-1 cursor-pointer"
              aria-hidden="true"
              @click="emit('updateField', '')"
            />
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400 cursor-pointer"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute outline-none mt-1 max-h-60 min-w-[240px] w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg"
          >
            <ListboxOption
              v-for="option in validatedOptions"
              v-slot="{ active, hover }"
              :key="option"
              :value="option"
              as="template"
              @click="$emit('updateField', option)"
            >
              <li :class="[active ? 'bg-amber-50' : 'text-gray-900', 'p-2 h-9']">
                <span :class="[hover ? 'font-medium' : 'font-normal']">{{ option }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { ChevronUpDownIcon, BackspaceIcon } from '@heroicons/vue/20/solid';
import { z } from 'zod';

const props = defineProps<{
  options?: unknown[];
  selected: string;
  label: string;
}>();

const validatedOptions = computed(() => {
  if (props.options) {
    return z.array(z.string()).parse(props.options);
  }
  return [];
});

const current = computed(() => props.selected);

const emit = defineEmits(['updateField']);
</script>
