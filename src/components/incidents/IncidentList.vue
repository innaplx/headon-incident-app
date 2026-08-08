<script setup lang="ts">
import { useIncidentStore } from '../../stores/useIncidentStore';
import IncidentFilter from './IncidentFilter.vue';
import IncidentCard from './IncidentCard.vue';

const store = useIncidentStore();
</script>

<template>
  <div class="w-80 md:w-96 bg-slate-50 border-r border-slate-200 h-full flex flex-col p-4 z-10 shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold text-slate-800 text-base">Incidents</h2>
      <span class="text-xs bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
        {{ store.filteredIncidents.length }}
      </span>
    </div>

    <IncidentFilter
      :filter-status="store.filterStatus"
      :filter-type="store.filterType"
      @update:filter-status="store.filterStatus = $event"
      @update:filter-type="store.filterType = $event"
    />

    <div class="flex-1 overflow-y-auto space-y-3 pr-1">
      <div v-if="store.filteredIncidents.length === 0" class="text-center py-8 text-slate-400 text-xs">
        No incidents match the selected filters.
      </div>

      <IncidentCard
        v-for="incident in store.filteredIncidents"
        :key="incident.id"
        :incident="incident"
        :is-selected="store.selectedIncidentId === incident.id"
        @select="store.selectIncident"
        @edit="store.openEditForm"
        @delete="store.deleteIncident"
      />
    </div>
  </div>
</template>
