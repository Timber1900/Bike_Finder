function distance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const LocationSort = (a, b, loc) => {
  console.log({a, b, loc})
  const dist1 = distance(
    loc.coords.latitude,
    loc.coords.longitude,
    a.location.latitude,
    a.location.longitude
  );
  const dist2 = distance(
    loc.coords.latitude,
    loc.coords.longitude,
    b.location.latitude,
    b.location.longitude
  );
  return dist1 - dist2;
}

export const LocationSortIndex = (a, b, loc) => {
  const dist1 = distance(
    loc.coords.latitude,
    loc.coords.longitude,
    a.latitude,
    a.longitude
  );
  const dist2 = distance(
    loc.coords.latitude,
    loc.coords.longitude,
    b.latitude,
    b.longitude
  );
  return dist1 - dist2;
}
