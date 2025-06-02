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

  const { allMarkers, searchResults } = useMarkers();
  const center = { lng: 36.2765, lat: 33.5138 };
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

  // Update markers and highlight searched one
  useEffect(() => {
    if (!map.current) return;

    // Clear old markers
    markerObjects.current.forEach(m => m.remove());
    markerObjects.current = [];

    // Create a set of searched marker names for fast lookup
    const highlightedNames = new Set(
      searchResults.map(m => m.name.toLowerCase())
    );

    allMarkers.forEach(m => {
      const isHighlighted = highlightedNames.has(m.name.toLowerCase());

      const newMarker = new maptilersdk.Marker({
        color: isHighlighted ? "red" : undefined,
      })
        .setLngLat([parseFloat(m.longitude), parseFloat(m.latitude)])
        .setPopup(new maptilersdk.Popup().setText(m.name))
        .addTo(map.current);
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
  }, [allMarkers, searchResults]);

  return (
    <div className="map-wrap" style={{ height: "100vh", width: "100%" }}>
      <div ref={mapContainer} className="map" style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
