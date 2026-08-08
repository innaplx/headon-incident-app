<script setup lang="ts">
import MapView from './components/incidents/MapView.vue';
import IncidentList from './components/incidents/IncidentList.vue';
import IncidentForm from './components/incidents/IncidentForm.vue';
import UiButton from './components/ui/UiButton.vue';
import { useIncidentStore } from './stores/useIncidentStore';

const store = useIncidentStore();
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
    <header class="bg-slate-900 text-white px-6 py-3.5 flex justify-between items-center shadow-md z-20">
      <div class="flex items-center gap-2">
        <span class="text-xl">🗺️</span>
        <h1 class="text-base font-bold tracking-wide">Incident Management System</h1>
      </div>
      <UiButton size="md" @click="store.openCreateForm()">
        <span>+</span>
        <span>New Incident</span>
      </UiButton>
    </header>

    <main class="flex-1 flex overflow-hidden relative">
      <IncidentList />
      <div class="flex-1 h-full relative">
        <MapView />
      </div>
      <IncidentForm />
    </main>
  </div>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
