<script setup lang="ts">
import { ref } from 'vue';
import type { Incident } from '../../types/incident';
import { STATUS_STYLES } from '../../constants/incidentConstants';
import { formatEnumLabel, formatIncidentDate } from '../../utils/formatters';
import UiBadge from '../ui/UiBadge.vue';
import UiButton from '../ui/UiButton.vue';
import ConfirmModal from '../ui/ConfirmModal.vue';

const props = defineProps<{
  incident: Incident;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  select: [id: number];
  edit: [id: number];
  delete: [id: number];
}>();

const isDeleteModalOpen = ref(false);

function openDeleteModal() {
  isDeleteModalOpen.value = true;
}

function handleConfirmDelete() {
  isDeleteModalOpen.value = false;
  emit('delete', props.incident.id);
}
</script>

<template>
  <div
    :class="[
      'p-3.5 rounded-lg border transition-all cursor-pointer relative',
      isSelected
        ? 'bg-blue-50/90 border-blue-500 shadow-md ring-1 ring-blue-500'
        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm',
    ]"
    @click="emit('select', incident.id)"
  >
    <div class="flex justify-between items-start gap-2">
      <h4 class="font-semibold text-xs text-slate-900 leading-snug">
        {{ incident.title }}
      </h4>
      <UiBadge
        :label="formatEnumLabel(incident.status)"
        :variant-class="STATUS_STYLES[incident.status]"
      />
    </div>

    <div class="mt-2 text-[11px] text-slate-500 space-y-1">
      <p class="font-medium text-slate-600">🏷️ {{ formatEnumLabel(incident.type) }}</p>
      <p>📅 {{ formatIncidentDate(incident.createdAt) }}</p>
    </div>

    <div class="mt-3 pt-2 border-t border-slate-100 flex justify-end gap-2" @click.stop>
      <UiButton variant="primary-text" @click="emit('edit', incident.id)">Edit</UiButton>
      <UiButton variant="danger-text" @click="openDeleteModal">Delete</UiButton>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmModal
      :is-open="isDeleteModalOpen"
      title="Delete Incident"
      :message="`Are you sure you want to delete '${incident.title}'? This action cannot be undone.`"
      confirm-label="Delete"
      @confirm="handleConfirmDelete"
      @cancel="isDeleteModalOpen = false"
    />
  </div>
</template>