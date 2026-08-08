# Incident Management System

Incident Management application built with **Vue 3 (Composition API)**, **TypeScript**, **Pinia**, **Leaflet**, and **Tailwind CSS**.

---

### Prerequisites

- Node.js (`>= 18.x`)
- npm / pnpm / yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

Vite serves the app locally (default: `http://localhost:5173`). Open that URL in your browser to use the application.

### Build for Production

- `npm run build` — type-check with `vue-tsc`, then bundle with Vite
- `npm run preview` — serve the production build locally for smoke testing

---

## 🛠 Tech Stack & Tooling

| Area | Choice |
| --- | --- |
| **Framework** | Vue 3 (`<script setup>`, Composition API) |
| **Language** | TypeScript |
| **State management** | Pinia (`useIncidentStore`) |
| **Mapping engine** | Leaflet.js |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| **Build tool** | Vite 8 |
| **Architecture** | Atomic Design & Smart/Dumb component pattern |

---

## 🏗 Architecture & Design Decisions

### Source layout

```
src/
├── App.vue                          # App shell: header, layout, feature regions
├── main.ts                          # Vue app bootstrap + Pinia
├── style.css                        # Global Tailwind entry
├── types/
│   └── incident.ts                  # Incident, enums, create/update DTOs
├── constants/
│   └── incidentConstants.ts         # Filter/form options, status badge styles
├── stores/
│   └── useIncidentStore.ts          # In-memory incidents, filters, selection, form state
├── utils/
│   └── formatters.ts                # Enum labels, dates, coordinates
├── lib/
│   └── map/
│       ├── markers.ts               # Leaflet icon configuration
│       └── incidentPopup.ts         # Popup HTML builder (HTML-safe)
├── composables/
│   ├── useLeafletMap.ts             # Pure Leaflet lifecycle (no Vue UI)
│   ├── useMapView.ts                # Pinia ↔ map synchronization
│   └── useIncidentForm.ts           # Create/edit form state and submit
└── components/
    ├── ui/                          # Presentational primitives (props + emits)
    │   ├── UiButton.vue
    │   ├── UiInput.vue
    │   ├── UiSelect.vue
    │   ├── UiBadge.vue
    │   ├── UiFormField.vue
    │   ├── SideDrawer.vue
    │   └── ConfirmModal.vue
    └── incidents/                   # Feature UI (containers + dumb cards/filters)
        ├── MapView.vue
        ├── IncidentList.vue
        ├── IncidentCard.vue
        ├── IncidentFilter.vue
        └── IncidentForm.vue
```

### Core engineering principles

1. **Separation of presentational & container components**  
   Dumb UI lives under `src/components/ui/` and is driven only by props and emitted events. Smart feature wiring sits in `src/components/incidents/` (for example `IncidentList` binds Pinia to `IncidentFilter` and `IncidentCard`) and in composables such as `useMapView` and `useIncidentForm`.

2. **Decoupled mapping layer**  
   Leaflet DOM work is isolated in `useLeafletMap.ts` and `lib/map/` (markers, popups). Vue never imports Leaflet directly in SFC templates. `useMapView.ts` watches store state and calls map APIs for markers, temp placement pins, and `flyTo` when an incident is selected.

3. **Single source of truth & DRY formatting**  
   Dropdown labels and filter values come from `incidentConstants.ts` (`INCIDENT_TYPES`, `INCIDENT_STATUSES`, plus derived `FORM_*` lists). Display formatting uses `formatters.ts` (`formatEnumLabel`, `formatIncidentDate`, `formatCoordinate`) in cards and map popups.

4. **In-memory state & map sync**  
   Incidents are seeded in Pinia and mutated in memory (create, update, delete). A full page refresh resets data. `filteredIncidents`, `selectedIncidentId`, and `tempLocation` keep the sidebar list, form drawer, and map markers aligned: selecting a card highlights the marker and flies the map; map clicks set location and can open the create form; filters instantly narrow both list and visible markers.

---

## 🤖 AI-Assisted Methodology (Cursor & LLM Workflow)

Development used **Cursor** with LLM assistance in a review-friendly loop:

- **Architectural scaffolding** — Initial Vue 3 + Pinia structure, incident types, store actions, and Leaflet composable setup aligned with the assignment requirements.
- **Refactoring & modularity** — Extraction of atomic UI under `components/ui/`, incident feature folder, `lib/map/` helpers, and shared formatters; reduction of duplicated markup and enum string handling across cards, filters, and popups.
- **Type safety & quality assurance** — Typed Pinia inputs (`CreateIncidentInput`, `UpdateIncidentInput`), typed component emits, and production builds via `vue-tsc -b && vite build` to catch regressions before deploy.

Human review remained the source of truth for UX decisions (side drawer vs. blocking modal on the map, delete confirmation flow, and filter behavior).

---