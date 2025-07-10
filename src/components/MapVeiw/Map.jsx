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
  const [stylesClicked, setStylesClicked] = useState(false)
  const [style, setStyle] = useState('STREETS')

  // Initialize map
  useEffect(() => {
    if (map.current) return;

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
  }, []);

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
  }, [allMarkers, searchResults, filterResults]);

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

  //Find me feature
  const handleFindMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          speed: 1.4,
        });

        const pulseEl = document.createElement('div');
        pulseEl.className = 'pulse-marker';

        new maptilersdk.Marker({ element: pulseEl })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };



  return (
    <div className="map-wrap" style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div ref={mapContainer} className="map" style={{ height: "100%", width: "100%" }} />
      <MapButton
        onClick={handleFindMe}
        icon="mdi:crosshairs-gps"
        title="Find Me"
        className="bottom-4 right-2 z-10" />
      <MapButton
        onClick={handleStylesClick}
        icon="mdi:palette"
        title="Map Styles"
        className="bottom-16 right-2 z-10" />

      {stylesClicked && (
        <div className="absolute bottom-20 right-16 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => handleStyleChange('STREETS')}
          >
            Streets
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStyleChange('OUTDOOR')}
          >
            outdoor
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStyleChange('SATELLITE')}
          >
            Satellite

          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleStyleChange('BASIC')}
          >
            Basic

          </button>
        </div>
      )
      }
    </div >
  );
}
