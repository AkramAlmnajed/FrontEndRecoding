import { useState } from 'react';
import Header from "../components/Header/header";
import MapView from "../components/MapVeiw/Map";
import Sidebar from "../components/Sidebar/sidebar";
import { useMarkers } from '../components/context/MarkersContext';




const Home = () => {

    const [clickedPosition, setClickedPosition] = useState(null);
    const [clickedMarker, setClickedMarker] = useState(null);
    const { fetchSpecificMarker } = useMarkers();

    const handleMapClick = (position) => {
        setClickedPosition(position);
        setClickedMarker(null);
    };
    const handleMarkerClick = async (marker) => {
        const markerData = await fetchSpecificMarker(marker.id);
        setClickedMarker(markerData);
        setClickedPosition(null);
    };




    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className="flex-1">
                    <MapView onMapClick={handleMapClick} onMarkerClick={handleMarkerClick} />
                </div>
                <Sidebar showMarkerForm={!!clickedPosition} clickedMarker={clickedMarker} position={clickedPosition} setPosition={setClickedPosition} setClickedMarker={setClickedMarker} />
            </div>
        </div>
    );
};

export default Home;