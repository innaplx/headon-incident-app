<script setup lang="ts">
import type { IncidentType, IncidentStatus } from '../../types/incident';
import { INCIDENT_TYPES, INCIDENT_STATUSES } from '../../constants/incidentConstants';
import UiFormField from '../ui/UiFormField.vue';
import UiSelect from '../ui/UiSelect.vue';

defineProps<{
  filterStatus: IncidentStatus | 'ALL';
  filterType: IncidentType | 'ALL';
}>();

defineEmits<{
  'update:filterStatus': [value: IncidentStatus | 'ALL'];
  'update:filterType': [value: IncidentType | 'ALL'];
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4 space-y-3">
    <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filters</h3>
    <div class="grid grid-cols-2 gap-2">
      <UiFormField label="Status">
        <UiSelect
          compact
          :model-value="filterStatus"
          :options="INCIDENT_STATUSES"
          @update:model-value="$emit('update:filterStatus', $event as IncidentStatus | 'ALL')"
        />
      </UiFormField>
      <UiFormField label="Type">
        <UiSelect
          compact
          :model-value="filterType"
          :options="INCIDENT_TYPES"
          @update:model-value="$emit('update:filterType', $event as IncidentType | 'ALL')"
        />
      </UiFormField>
    </div>
  </div>
</template>
