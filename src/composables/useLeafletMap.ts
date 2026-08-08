import L from 'leaflet';
import type { Incident } from '../types/incident';
import { defaultMarkerIcon, selectedMarkerIcon, tempMarkerIcon } from '../lib/map/markers';
import { buildIncidentPopupContent } from '../lib/map/incidentPopup';

const DEFAULT_CENTER: L.LatLngExpression = [32.0853, 34.7818];
const DEFAULT_ZOOM = 13;

export function useLeafletMap() {
  let map: L.Map | null = null;
  const markersMap = new Map<number, L.Marker>();
  let tempMarker: L.Marker | null = null;

  function initMap(container: HTMLElement, onMapClick: (lat: number, lng: number) => void) {
    map = L.map(container).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    });
  }

  function updateMarkers(
    incidents: Incident[],
    selectedId: number | null,
    onSelect: (id: number) => void,
  ) {
    if (!map) return;

    markersMap.forEach((m) => m.remove());
    markersMap.clear();

    incidents.forEach((incident) => {
      const isSelected = incident.id === selectedId;
      const marker = L.marker([incident.latitude, incident.longitude], {
        icon: isSelected ? selectedMarkerIcon : defaultMarkerIcon,
      });

      marker.bindPopup(buildIncidentPopupContent(incident));
      marker.on('click', () => onSelect(incident.id));
      marker.addTo(map!);
      markersMap.set(incident.id, marker);
    });
  }

  function updateTempMarker(location: { lat: number; lng: number } | null) {
    if (!map) return;

    if (tempMarker) {
      tempMarker.remove();
      tempMarker = null;
    }

    if (location) {
      tempMarker = L.marker([location.lat, location.lng], { icon: tempMarkerIcon })
        .addTo(map)
        .bindPopup('New Selected Location')
        .openPopup();
    }
  }

  function flyToIncident(incident: Incident) {
    if (!map) return;
    map.flyTo([incident.latitude, incident.longitude], 15, { duration: 1 });
    markersMap.get(incident.id)?.openPopup();
  }

  function destroyMap() {
    if (map) {
      map.remove();
      map = null;
    }
  }

  return {
    initMap,
    updateMarkers,
    updateTempMarker,
    flyToIncident,
    destroyMap,
  };
}
