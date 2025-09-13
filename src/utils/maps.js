export const mapsSearchUrl = (lat, lng) =>
  `https://www.google.com/maps?q=${lat},${lng}`;

export const mapsDirectionsUrl = (lat, lng) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;