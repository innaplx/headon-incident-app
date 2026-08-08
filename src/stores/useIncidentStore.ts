import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Incident, IncidentType, IncidentStatus, CreateIncidentInput, UpdateIncidentInput } from '../types/incident';

export const useIncidentStore = defineStore('incidents', () => {
  const incidents = ref<Incident[]>([
    {
      id: 1,
      title: "Power outage near city center",
      type: "POWER_OUTAGE",
      status: "OPEN",
      latitude: 32.0853,
      longitude: 34.7818,
      createdAt: "2026-07-15T08:30:00Z"
    },
    {
      id: 2,
      title: "Blocked road following construction work",
      type: "ROAD_BLOCKAGE",
      status: "IN_PROGRESS",
      latitude: 32.095,
      longitude: 34.801,
      createdAt: "2026-07-16T10:15:00Z"
    },
    {
      id: 3,
      title: "Damaged electrical cabinet",
      type: "INFRASTRUCTURE_DAMAGE",
      status: "RESOLVED",
      latitude: 32.071,
      longitude: 34.769,
      createdAt: "2026-07-17T13:45:00Z"
    },
    {
      id: 4,
      title: "Unsafe cable reported by resident",
      type: "SAFETY_ISSUE",
      status: "OPEN",
      latitude: 32.105,
      longitude: 34.7900,
      createdAt: "2026-07-18T07:20:00Z"
    }
  ]);

  const selectedIncidentId = ref<number | null>(null);
  const filterType = ref<IncidentType | 'ALL'>('ALL');
  const filterStatus = ref<IncidentStatus | 'ALL'>('ALL');

  const isFormOpen = ref(false);
  const editingIncidentId = ref<number | null>(null);
  const tempLocation = ref<{ lat: number; lng: number } | null>(null);

  const filteredIncidents = computed(() => {
    return incidents.value.filter(item => {
      const matchType = filterType.value === 'ALL' || item.type === filterType.value;
      const matchStatus = filterStatus.value === 'ALL' || item.status === filterStatus.value;
      return matchType && matchStatus;
    });
  });

  const selectedIncident = computed(() => {
    return incidents.value.find(i => i.id === selectedIncidentId.value) || null;
  });

  function selectIncident(id: number | null) {
    selectedIncidentId.value = id;
  }

  function setTempLocation(lat: number, lng: number) {
    tempLocation.value = { lat, lng };
  }

  function openCreateForm() {
    editingIncidentId.value = null;
    tempLocation.value = null;
    isFormOpen.value = true;
  }

  function openEditForm(id: number) {
    const inc = incidents.value.find(i => i.id === id);
    if (inc) {
      editingIncidentId.value = id;
      tempLocation.value = { lat: inc.latitude, lng: inc.longitude };
      isFormOpen.value = true;
    }
  }

  function closeForm() {
    isFormOpen.value = false;
    editingIncidentId.value = null;
    tempLocation.value = null;
  }

  function createIncident(data: CreateIncidentInput) {
    const newId = incidents.value.length ? Math.max(...incidents.value.map(i => i.id)) + 1 : 1;
    const newIncident: Incident = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString()
    };
    incidents.value.push(newIncident);
    selectedIncidentId.value = newId;
    closeForm();
  }

  function updateIncident(id: number, data: UpdateIncidentInput) {
    const index = incidents.value.findIndex(i => i.id === id);
    if (index !== -1) {
      incidents.value[index] = { ...incidents.value[index], ...data };
      selectedIncidentId.value = id;
    }
    closeForm();
  }

  function deleteIncident(id: number) {
    incidents.value = incidents.value.filter(i => i.id !== id);
    if (selectedIncidentId.value === id) {
      selectedIncidentId.value = null;
    }
  }

  return {
    incidents,
    selectedIncidentId,
    filterType,
    filterStatus,
    filteredIncidents,
    selectedIncident,
    isFormOpen,
    editingIncidentId,
    tempLocation,
    selectIncident,
    setTempLocation,
    openCreateForm,
    openEditForm,
    closeForm,
    createIncident,
    updateIncident,
    deleteIncident
  };
});