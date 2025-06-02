import axios from 'axios';
import { useState } from 'react';
import Header from "../components/Header/header";
import MapView from "../components/MapVeiw/Map";
import Sidebar from "../components/Sidebar/sidebar";




const Home = () => {

    const [clickedPosition, setClickedPosition] = useState(null);
    const [clickedMarker, setClickedMarker] = useState(null); // NEW

    const handleMapClick = (position) => {
        setClickedPosition(position);
        setClickedMarker(null);
    };
    const handleMarkerClick = (marker) => {
        setClickedMarker(marker);
        setClickedPosition(null); // ← Clear map click
    };




    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className="flex-1">
                    <MapView onMapClick={handleMapClick} onMarkerClick={handleMarkerClick} />
                </div>
                <Sidebar showMarkerForm={!!clickedPosition} clickedMarker={clickedMarker} />
            </div>
        </div>
    );
};

export default Home;