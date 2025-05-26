import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef } from 'react';

maptilersdk.config.apiKey = 'eNjUSBU04MmXxL1ACa33';

export default function MapView({ onMapClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  const center = { lng: 36.2765, lat: 33.5138 };
  const zoom = 13;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      console.log("Map clicked at:", lng, lat);
      if (onMapClick) onMapClick({ lng, lat });


      if (markerRef.current) {

        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new maptilersdk.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);
      }
    });
  }, [center.lng, center.lat, zoom, onMapClick]);

  return (
    <div className="map-wrap" style={{ height: '100vh', width: '100%' }}>
      <div ref={mapContainer} className="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
