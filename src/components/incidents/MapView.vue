<script setup lang="ts">
import { ref, computed } from 'vue';
import { useIncidentStore } from '../../stores/useIncidentStore';
import { useMapView } from '../../composables/useMapView';

const store = useIncidentStore();
const mapContainer = ref<HTMLDivElement | null>(null);

useMapView(mapContainer);

const showLocationHint = computed(() => store.isFormOpen);
</script>

<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full z-0" />
    <div
      v-if="showLocationHint"
      class="absolute top-4 left-4 z-[1000] bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs shadow-md animate-pulse"
    >
      📍 Click anywhere on the map to set incident location
    </div>
  </div>
</template>
