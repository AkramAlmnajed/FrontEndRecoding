import { Icon } from "@iconify/react";
import { useState } from 'react';
import ViewDetailsDialog from "../components/Forms/ViewDetailsDialog";
import Header from "../components/Header/header";
import MapView from "../components/MapVeiw/Map";
import Sidebar from "../components/Sidebar/sidebar";
import { useMarkers } from '../components/context/MarkersContext';

const Home = () => {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [viewedMarker, setViewedMarker] = useState(null);

  const { fetchSpecificMarker } = useMarkers();

  const handleMapClick = (position) => {
    setClickedPosition(position);
    setClickedMarker(null);
    setSidebarOpen(true);
  };

  const handleMarkerClick = async (marker) => {
    const markerData = await fetchSpecificMarker(marker.id);
    setClickedMarker(markerData);
    setClickedPosition(null);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setClickedMarker(null);
    setClickedPosition(null);
  };

  const handleViewDetails = async (marker) => {
    try {
      const markerData = await fetchSpecificMarker(marker.location.id);
      setViewedMarker(markerData.location);
      setShowDetailsDialog(true);
    } catch (err) {
      console.error("Failed to fetch marker details:", err);
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="flex-1">
          <MapView onMapClick={handleMapClick} onMarkerClick={handleMarkerClick} />
        </div>
        <Sidebar
          showMarkerForm={!!clickedPosition || !!clickedMarker}
          clickedMarker={clickedMarker}
          position={clickedPosition}
          setPosition={setClickedPosition}
          setClickedMarker={setClickedMarker}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Floating button for mobile */}
      <button
        className="fixed bottom-6 right-6 z-50 md:hidden bg-cyan-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Icon icon="mdi:menu" className="text-2xl" />
      </button>

      <ViewDetailsDialog
        key={viewedMarker?.id}
        isOpen={showDetailsDialog}
        onClose={() => {
          setShowDetailsDialog(false);
          setViewedMarker(null);
        }}
        location={viewedMarker}
      />
    </div>
  );
};

export default Home;