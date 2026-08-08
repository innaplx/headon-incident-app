<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import UiButton from './UiButton.vue';

defineProps<{
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('cancel');
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div
        class="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-150 p-5 space-y-4"
        @click.stop
      >
        <div class="flex items-start gap-3">
          <div class="p-2 bg-red-100 text-red-600 rounded-full shrink-0 text-sm">
            ⚠️
          </div>
          <div>
            <h3 class="font-bold text-sm text-slate-900">
              {{ title || 'Confirm Action' }}
            </h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">
              {{ message }}
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <UiButton variant="secondary" @click="emit('cancel')">
            {{ cancelLabel || 'Cancel' }}
          </UiButton>
          <UiButton variant="danger-text" @click="emit('confirm')">
            {{ confirmLabel || 'Delete' }}
          </UiButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>