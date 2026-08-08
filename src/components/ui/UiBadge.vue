<script setup lang="ts">
defineProps<{
  label: string;
  variantClass: string;
}>();
</script>

<template>
  <span
    :class="[
      'text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap',
      variantClass,
    ]"
  >
    {{ label }}
  </span>
</template>
