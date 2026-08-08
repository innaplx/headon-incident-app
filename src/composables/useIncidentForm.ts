import { ref, watch, computed } from 'vue';
import { useIncidentStore } from '../stores/useIncidentStore';
import type { IncidentType, IncidentStatus } from '../types/incident';

const DEFAULT_TYPE: IncidentType = 'POWER_OUTAGE';
const DEFAULT_STATUS: IncidentStatus = 'OPEN';

export function useIncidentForm() {
  const store = useIncidentStore();

  const title = ref('');
  const type = ref<IncidentType>(DEFAULT_TYPE);
  const status = ref<IncidentStatus>(DEFAULT_STATUS);

  const isEditing = computed(() => store.editingIncidentId !== null);
  const drawerTitle = computed(() => (isEditing.value ? 'Edit Incident' : 'Create New Incident'));
  const submitLabel = computed(() => (isEditing.value ? 'Save' : 'Create'));

  watch(
    () => store.editingIncidentId,
    (id) => {
      if (id) {
        const inc = store.incidents.find((i) => i.id === id);
        if (inc) {
          title.value = inc.title;
          type.value = inc.type;
          status.value = inc.status;
        }
      } else {
        title.value = '';
        type.value = DEFAULT_TYPE;
        status.value = DEFAULT_STATUS;
      }
    },
    { immediate: true },
  );

  function handleSubmit() {
    if (!title.value.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!store.tempLocation) {
      alert('Please click anywhere on the map to select a location!');
      return;
    }

    const payload = {
      title: title.value,
      type: type.value,
      status: status.value,
      latitude: store.tempLocation.lat,
      longitude: store.tempLocation.lng,
    };

    if (store.editingIncidentId) {
      store.updateIncident(store.editingIncidentId, payload);
    } else {
      store.createIncident(payload);
    }
  }

  return {
    title,
    type,
    status,
    isEditing,
    drawerTitle,
    submitLabel,
    handleSubmit,
    close: () => store.closeForm(),
    isOpen: computed(() => store.isFormOpen),
    tempLocation: computed(() => store.tempLocation),
  };
}
