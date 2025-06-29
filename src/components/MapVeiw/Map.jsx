import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef } from "react";
import { useMarkers } from "../context/MarkersContext";

maptilersdk.config.apiKey = "eNjUSBU04MmXxL1ACa33";

export default function MapView({ onMapClick, onMarkerClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);
  const markerObjects = useRef([]);

  const { allMarkers, searchResults, filterResults } = useMarkers();
  const center = { lng: 36.2965, lat: 33.5138 };
  const zoom = 11;

  // Initialize map once
  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      if (onMapClick) onMapClick({ lng, lat });

      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new maptilersdk.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);
      }
    });
  }, []);

  // Highlight and zoom logic
  useEffect(() => {
    if (!map.current) return;

    // 🧹 Clear previous markers
    markerObjects.current.forEach(m => m.remove());
    markerObjects.current = [];

    // 🔍 If search results exist, zoom to first one
    if (searchResults.length > 0) {
      const first = searchResults[0];
      map.current.flyTo({
        center: [parseFloat(first.longitude), parseFloat(first.latitude)],
        zoom: 14,
        speed: 1.6,
        curve: 1.42,
      });
    } else {
      // 🔄 If no search results (even if filters exist), reset to default view
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom: zoom,
        speed: 1.2,
        curve: 1.2,
      });
    }

    // 🔴 Highlighting logic
    const highlightedSearchNames = new Set(
      searchResults.map(m => m.name.toLowerCase())
    );
    const highlightedFilterNames = new Set(
      filterResults.map(m => m.name.toLowerCase())
    );

    allMarkers.forEach(m => {
      const isHighlighted =
        highlightedSearchNames.has(m.name.toLowerCase()) ||
        highlightedFilterNames.has(m.name.toLowerCase());

      const newMarker = new maptilersdk.Marker({
        color: isHighlighted ? "red" : undefined,
      })
        .setLngLat([parseFloat(m.longitude), parseFloat(m.latitude)])
        .setPopup(new maptilersdk.Popup().setText(m.name))
        .addTo(map.current);

      newMarker.getElement().title = m.name;

      newMarker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        if (onMarkerClick) onMarkerClick(m);
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      });

      markerObjects.current.push(newMarker);
    });
  }, [allMarkers, searchResults, filterResults]); // ✅ Re-run when markers or results change

  return (
    <div className="map-wrap" style={{ height: "100vh", width: "100%" }}>
      <div ref={mapContainer} className="map" style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
