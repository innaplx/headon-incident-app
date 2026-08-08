<script setup lang="ts">
import { FORM_INCIDENT_TYPES, FORM_INCIDENT_STATUSES } from '../../constants/incidentConstants';
import { formatCoordinate } from '../../utils/formatters';
import { useIncidentForm } from '../../composables/useIncidentForm';
import SideDrawer from '../ui/SideDrawer.vue';
import UiFormField from '../ui/UiFormField.vue';
import UiInput from '../ui/UiInput.vue';
import UiSelect from '../ui/UiSelect.vue';
import UiButton from '../ui/UiButton.vue';

const {
  title,
  type,
  status,
  drawerTitle,
  submitLabel,
  handleSubmit,
  close,
  isOpen,
  tempLocation,
} = useIncidentForm();
</script>

<template>
  <SideDrawer :open="isOpen" :title="drawerTitle" @close="close">
    <form class="p-4 space-y-3" @submit.prevent="handleSubmit">
      <UiFormField label="Title">
        <UiInput v-model="title" placeholder="e.g. Water leak" required />
      </UiFormField>

      <UiFormField label="Incident Type">
        <UiSelect v-model="type" :options="FORM_INCIDENT_TYPES" />
      </UiFormField>

      <UiFormField label="Status">
        <UiSelect v-model="status" :options="FORM_INCIDENT_STATUSES" />
      </UiFormField>

      <div class="bg-blue-50/80 border border-blue-200 rounded-lg p-3 text-xs">
        <span class="font-semibold text-blue-900">Location Status</span>
        <div v-if="tempLocation" class="font-mono text-[11px] text-slate-700 mt-1">
          Lat: {{ formatCoordinate(tempLocation.lat) }}<br />
          Lng: {{ formatCoordinate(tempLocation.lng) }}
        </div>
        <div v-else class="text-amber-800 font-medium text-[11px] flex items-center gap-1 animate-pulse mt-1">
          📍 Click anywhere on the map to set location!
        </div>
      </div>

      <div class="pt-2 flex justify-end gap-2 border-t border-slate-100">
        <UiButton variant="secondary" type="button" @click="close">Cancel</UiButton>
        <UiButton type="submit">{{ submitLabel }}</UiButton>
      </div>
    </form>
  </SideDrawer>
</template>
