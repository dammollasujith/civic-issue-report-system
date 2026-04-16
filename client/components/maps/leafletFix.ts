// Leaflet touches `window` at import time. In Next.js SSR, guard it.
export async function ensureLeafletIcons() {
  if (typeof window === "undefined") return;

  const L = (await import("leaflet")).default;

  // Fix default marker icons in Next.js bundling.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
  });
}

