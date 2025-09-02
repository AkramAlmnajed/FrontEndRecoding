import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
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

  const aspectToIcon = {
    "Culture & Heritage": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>pillar</title><path d="M6,5H18A1,1 0 0,1 19,6A1,1 0 0,1 18,7H6A1,1 0 0,1 5,6A1,1 0 0,1 6,5M21,2V4H3V2H21M15,8H17V22H15V8M7,8H9V22H7V8M11,8H13V22H11V8Z" /></svg>,
    "Building Code & Policy": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>code-array</title><path d="M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M6,6V18H10V16H8V8H10V6H6M16,16H14V18H18V6H14V8H16V16Z" /></svg>,
    "Economic Factor": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>currency-usd</title><path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" /></svg>,
    "Public Health": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>medical-bag</title><path d="M10,3L8,5V7H5C3.85,7 3.12,8 3,9L2,19C1.88,20 2.54,21 4,21H20C21.46,21 22.12,20 22,19L21,9C20.88,8 20.06,7 19,7H16V5L14,3H10M10,5H14V7H10V5M11,10H13V13H16V15H13V18H11V15H8V13H11V10Z" /></svg>,
    "Resources Management": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>wrench-clock</title><path d="M10 6.2C10 4.3 8.8 2.6 7 2V5.7H4V2C2.2 2.6 1 4.3 1 6.2C1 8.1 2.2 9.8 4 10.4V21.4C4 21.8 4.2 22 4.5 22H6.5C6.8 22 7 21.8 7 21.5V10.5C8.8 9.9 10 8.2 10 6.2M16 8C16 8 15.9 8 16 8C12.1 8.1 9 11.2 9 15C9 18.9 12.1 22 16 22S23 18.9 23 15 19.9 8 16 8M16 20C13.2 20 11 17.8 11 15S13.2 10 16 10 21 12.2 21 15 18.8 20 16 20M15 11V16L18.6 18.2L19.4 17L16.5 15.3V11H15Z" /></svg>,
    "Urban Planning": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>city</title><path d="M19,15H17V13H19M19,19H17V17H19M13,7H11V5H13M13,11H11V9H13M13,15H11V13H13M13,19H11V17H13M7,11H5V9H7M7,15H5V13H7M7,19H5V17H7M15,11V5L12,2L9,5V7H3V21H21V11H15Z" /></svg>,
    "Data Collection & Analysis": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>chart-bar</title><path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" /></svg>,
    "Technology & Digital Infrastructure": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>laptop</title><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" /></svg>,
    "Ecological Factor": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>leaf</title><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" /></svg>,
    "Social Factor": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>account-group</title><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" /></svg>,
    "Natural Environment": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>forest</title><path d="M16 12L9 2L2 12H3.86L0 18H7V22H11V18H18L14.14 12H16M20.14 12H22L15 2L12.61 5.41L17.92 13H15.97L19.19 18H24L20.14 12M13 19H17V22H13V19Z" /></svg>,
    "Health & Services": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><title>medical-bag</title><path d="M10,3L8,5V7H5C3.85,7 3.12,8 3,9L2,19C1.88,20 2.54,21 4,21H20C21.46,21 22.12,20 22,19L21,9C20.88,8 20.06,7 19,7H16V5L14,3H10M10,5H14V7H10V5M11,10H13V13H16V15H13V18H11V15H8V13H11V10Z" /></svg>
  }

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
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        speed: 1.6,
        curve: 1.4
      });
    });
  }, [onMapClick]);


  //create markers
  useEffect(() => {
    if (!map.current) return;
    // Clear old markers
    markerObjects.current.forEach(m => {
      m.marker.remove();
    });
    markerObjects.current = [];

    allMarkers.forEach(m => {
      const el = document.createElement("div");
      el.style.display = "flex";
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
      el.style.width = "32px";
      el.style.height = "32px";
      el.title = m.name;

      const aspectIcon = aspectToIcon[m.aspect] || aspectToIcon["Default"];

      const root = createRoot(el);
      root.render(
        <div style={{ color: "#3fb1ce" }}>
          <div style={{ pointerEvents: "none" }}>
            {aspectIcon}
          </div>
        </div>
      );

      const newMarker = new maptilersdk.Marker({ element: el })
        .setLngLat([parseFloat(m.longitude), parseFloat(m.latitude)])
        .setPopup(new maptilersdk.Popup().setText(m.name))
        .addTo(map.current);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        map.current.flyTo({
          center: [parseFloat(m.longitude), parseFloat(m.latitude)],
          zoom: 14,
          speed: 1.6,
          curve: 1.4
        });
        if (onMarkerClick) onMarkerClick(m);
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      });

      // store marker + react root + data
      markerObjects.current.push({ marker: newMarker, root, data: m });

      return () => {
        allMarkers.forEach(({ marker, root }) => {
          marker.remove();
          root.unmount();
        });
      };
    });
  }, [allMarkers]);

  //search markers
  useEffect(() => {
    if (!map.current || markerObjects.current.length === 0) return;

    const highlightedSearch = new Set(
      searchResults.map(m => m.name.toLowerCase())
    );

    markerObjects.current.forEach(({ root, data }) => {
      const isHighlighted =
        highlightedSearch.has(data.name.toLowerCase())

      const aspectIcon = aspectToIcon[data.aspect] || aspectToIcon["Default"];

      root.render(
        <div style={{ color: isHighlighted ? "red" : "#3fb1ce" }}>
          <div style={{ pointerEvents: "none" }}>{aspectIcon}</div>
        </div>
      );
    });
  }, [searchResults]);

  //filter markers
  useEffect(() => {
    if (!map.current || markerObjects.current.length === 0) return;
    markerObjects.current.forEach(({ marker }) => marker.remove());

    if (filterResults.length === 0) {
      markerObjects.current.forEach(({ marker }) => marker.addTo(map.current));
      return;
    }
    const highlightedFilter = new Set(
      filterResults.map(m => m.name.toLowerCase())
    );

    // Re-add only filtered ones in red
    markerObjects.current.forEach(({ marker, root, data }) => {
      if (highlightedFilter.has(data.name.toLowerCase())) {
        const aspectIcon = aspectToIcon[data.aspect] || aspectToIcon["Default"];

        root.render(
          <div style={{ color: "red" }}>
            <div style={{ pointerEvents: "none" }}>{aspectIcon}</div>
          </div>
        );

        marker.addTo(map.current);
      }
    });
    map.current.flyTo({
      center: [center.lng, center.lat],
      zoom: 10,
      speed: 1.6,
      curve: 1.4
    });
  }, [filterResults]);


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