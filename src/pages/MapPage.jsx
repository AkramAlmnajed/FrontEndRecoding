import { useState } from 'react';
import Header from "../components/Header/header";
import MapView from "../components/MapVeiw/Map";
import Sidebar from "../components/Sidebar/sidebar";


const Home = () => {

    const [clickedPosition, setClickedPosition] = useState(null);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className="flex-1">
                    <MapView onMapClick={setClickedPosition} />
                </div>
                <Sidebar showMarkerForm={!!clickedPosition} />
            </div>
        </div>
    );
};

export default Home;