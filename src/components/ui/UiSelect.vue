<script setup lang="ts">
export type SelectOption = { label: string; value: string };

defineProps<{
  modelValue: string;
  options: SelectOption[];
  id?: string;
  compact?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const baseClass =
  'w-full text-xs p-2 bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
</script>

<template>
  <select
    :id="id"
    :value="modelValue"
    :class="[baseClass, compact ? 'rounded-md' : 'rounded-lg']"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
