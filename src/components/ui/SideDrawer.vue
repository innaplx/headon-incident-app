<script setup lang="ts">
import UiButton from './UiButton.vue';

defineProps<{
  open: boolean;
  title: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[2000] pointer-events-none flex items-center justify-end p-6"
  >
    <div
      class="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden pointer-events-auto animate-in slide-in-from-right duration-200"
    >
      <div class="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center">
        <h3 class="font-bold text-xs tracking-wide">{{ title }}</h3>
        <UiButton
          variant="ghost"
          size="sm"
          class="!px-1 !py-0 !bg-transparent text-slate-400 hover:!text-white"
          @click="$emit('close')"
        >
          ✕
        </UiButton>
      </div>
      <slot />
    </div>
  </div>
</template>
