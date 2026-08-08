import L from 'leaflet';

const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
const markerSize: L.PointExpression = [25, 41];
const markerAnchor: L.PointExpression = [12, 41];
const popupAnchor: L.PointExpression = [1, -34];

function createMarkerIcon(iconUrl: string): L.Icon {
  return L.icon({
    iconUrl,
    shadowUrl,
    iconSize: markerSize,
    iconAnchor: markerAnchor,
    popupAnchor,
  });
}

export const defaultMarkerIcon = createMarkerIcon(
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
);

export const selectedMarkerIcon = createMarkerIcon(
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
);

export const tempMarkerIcon = createMarkerIcon(
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
);
