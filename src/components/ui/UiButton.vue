<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger-text' | 'primary-text';
    size?: 'sm' | 'md';
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'sm',
  },
);

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
  secondary: 'text-slate-600 hover:bg-slate-100',
  ghost: 'text-slate-400 hover:text-white',
  'danger-text': 'text-red-600 hover:text-red-800 hover:bg-red-50',
  'primary-text': 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
};

const sizeClasses: Record<string, string> = {
  sm: 'text-[11px] px-2 py-1',
  md: 'text-xs px-3.5 py-1.5',
};
</script>

<template>
  <button
    :type="type"
    :class="[
      'font-medium rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <slot />
  </button>
</template>
