import { onMounted, watch, onUnmounted, type Ref } from 'vue';
import { useIncidentStore } from '../stores/useIncidentStore';
import { useLeafletMap } from './useLeafletMap';

export function useMapView(mapContainer: Ref<HTMLDivElement | null>) {
  const store = useIncidentStore();
  const { initMap, updateMarkers, updateTempMarker, flyToIncident, destroyMap } = useLeafletMap();

  function syncMarkers() {
    updateMarkers(store.filteredIncidents, store.selectedIncidentId, store.selectIncident);
  }

  onMounted(() => {
    if (!mapContainer.value) return;

    initMap(mapContainer.value, (lat, lng) => {
      store.setTempLocation(lat, lng);
      if (!store.isFormOpen) store.openCreateForm();
    });

    syncMarkers();
  });

  watch(
    [() => store.filteredIncidents, () => store.selectedIncidentId],
    ([, selectedId]) => {
      syncMarkers();
      if (selectedId) {
        const selected = store.incidents.find((i) => i.id === selectedId);
        if (selected) flyToIncident(selected);
      }
    },
    { deep: true },
  );

  watch(() => store.tempLocation, (loc) => updateTempMarker(loc));

  onUnmounted(() => destroyMap());
}
