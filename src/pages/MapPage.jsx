import { useState } from 'react';
import { Icon } from "@iconify/react";
import Header from "../components/Header/header";
import MapView from "../components/MapVeiw/Map";
import Sidebar from "../components/Sidebar/sidebar";
import { useMarkers } from '../components/context/MarkersContext';

const Home = () => {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { fetchSpecificMarker } = useMarkers();

  const handleMapClick = (position) => {
    setClickedPosition(position);
    setClickedMarker(null);
    setSidebarOpen(true); // open sidebar when clicking on map
  };

  const handleMarkerClick = async (marker) => {
    const markerData = await fetchSpecificMarker(marker.id);
    setClickedMarker(markerData);
    setClickedPosition(null);
    setSidebarOpen(true); // open sidebar when clicking a marker
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setClickedMarker(null);
    setClickedPosition(null);
  };

   <button className="fixed bottom-6 right-6 z-50 md:hidden bg-cyan-600 text-white rounded-full p-4 shadow-lg" onClick={() => setSidebarOpen(true)}>
     <Icon icon="mdi:menu" className="text-2xl" />
   </button>

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="flex-1">
          <MapView onMapClick={handleMapClick} onMarkerClick={handleMarkerClick} />
        </div>
        <Sidebar
          showMarkerForm={!!clickedPosition}
          clickedMarker={clickedMarker}
          position={clickedPosition}
          setPosition={setClickedPosition}
          setClickedMarker={setClickedMarker}
          isOpen={isSidebarOpen}           // <-- PASS THIS
          onClose={handleSidebarClose}     // <-- PASS THIS
        />
      </div>
    </div>
  );
};

export default Home;
