<script setup lang="ts">
defineProps<{
  label: string;
  htmlFor?: string;
}>();
</script>

<template>
  <div>
    <label
      :for="htmlFor"
      class="block text-xs font-semibold text-slate-700 mb-1"
    >
      {{ label }}
    </label>
    <slot />
  </div>
</template>
