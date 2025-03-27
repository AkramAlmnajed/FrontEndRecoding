import React from "react";
import Header from "../components/Header/header";
import Sidebar from "../components/Sidebar/sidebar";
import MapView from "../components/MapVeiw/Map";

const Home = () => {
    return (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1">
            <div className="flex-1">
              <MapView />
            </div>
            <Sidebar /> 
          </div>
        </div>
      );
    };

export default Home;
