<script setup lang="ts">
defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClass =
  'w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
</script>

<template>
  <input
    :id="id"
    :type="type ?? 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :class="inputClass"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
