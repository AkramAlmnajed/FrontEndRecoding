import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";
import { useMarkers } from "../context/MarkersContext";
import MapButton from '../FormElements/MapButton';

maptilersdk.config.apiKey = "eNjUSBU04MmXxL1ACa33";

export default function MapView({ onMapClick, onMarkerClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);
  const markerObjects = useRef([]);

  const { allMarkers, searchResults, filterResults } = useMarkers();
  const center = { lng: 36.2965, lat: 33.5138 };
  const zoom = 11;
  const [stylesClicked, setStylesClicked] = useState(false);
  const [style, setStyle] = useState('STREETS');
  const token = localStorage.getItem("accessToken")
  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle[style],
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
  }, [onMapClick]);

  // Highlight and zoom logic
  useEffect(() => {
    if (!map.current) return;

    markerObjects.current.forEach(m => m.remove());
    markerObjects.current = [];

    if (searchResults.length > 0) {
      const first = searchResults[0];
      map.current.flyTo({
        center: [parseFloat(first.longitude), parseFloat(first.latitude)],
        zoom: 14,
        speed: 1.6,
        curve: 1.42,
      });
    } else {
      map.current.flyTo({
        center: [center.lng, center.lat],
        zoom: zoom,
        speed: 1.2,
        curve: 1.2,
      });
    }

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
  }, [allMarkers, searchResults, filterResults, onMarkerClick]);

  //change map style feature
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(maptilersdk.MapStyle[style]);
    }
  }, [style]);

  const handleStylesClick = () => {
    setStylesClicked((prev) => !prev);
  };
  const handleStyleChange = (newStyle) => {
    setStyle(newStyle);
    setStylesClicked(false);
  };


  //download markers csv
  const downloadCSV = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/locations/exportcsv", {
        method: "GET",
        headers: {
          Accept: "text/csv",
          Authorization: `Bearer ${token}`

        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response text:", errorText);

        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();
      let filename = "Markers.csv";
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Could not download CSV file.");
    }
  };


  return (
    <div className="map-wrap" style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div ref={mapContainer} className="map" style={{ height: "100%", width: "100%" }} />

      {/* Map Controls - Responsive positioning */}
      <MapButton
        onClick={handleStylesClick}
        icon="mdi:palette"
        title="Map Styles"
        className="bottom-4 right-2 md:right-2 z-10"
      />

      {/* Style Menu - Responsive */}
      {stylesClicked && (
        <div className="absolute bottom-20 right-14 md:right-16 w-36 md:w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          <button
            className="w-full text-left px-3 md:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleStyleChange('STREETS')}
          >
            Streets
          </button>
          <button
            className="w-full text-left px-3 md:px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleStyleChange('OUTDOOR')}
          >
            Outdoor
          </button>
          <button
            className="w-full text-left px-3 md:px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleStyleChange('SATELLITE')}
          >
            Satellite
          </button>
          <button
            className="w-full text-left px-3 md:px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleStyleChange('BASIC')}
          >
            Basic
          </button>
        </div>
      )}
      <MapButton
        onClick={downloadCSV}
        icon="mdi:download"
        title="download markers' info"
        className="bottom-16 right-2 md:right-2 z-10"
      />

    </div>
  );
}