import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center bg-gray-100 p-3 border-b border-gray-300">
      {/* Left Side - Logos */}
      <div className="flex items-center space-x-6">
        <img
          src="/assets/MOSAICCOLOR.png"
          alt="Recoding Logo"
          className="h-14"
        />
        <div className="border-l border-gray-300 h-6"></div>
        <img
          src="/assets/Platform_Horizontal_Transparent.png"
          alt="Post-Crisis Logo"
          className="h-14"
        />
        <div className="border-l border-gray-300 h-6"></div>
        <img
          src="/assets/FOUNDATION_BLACK.png"
          alt="Reparametrize Logo"
          className="h-14"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/name.png"
            alt="User Avatar"
            className="h-6 w-6 rounded-full"
          />

          <span className="text-gray-700 font-medium">Jehad Alghmyan</span>
          <img
            src="/assets/DropDown.png"
            alt="User Avatar"
            className="h-6 w-6 rounded-full"
          />
        </div>
        <div className="border-l border-gray-300 h-6"></div>

        <div className="flex items-center space-x-2 text-gray-600">
          {/* <Icon
            icon="mdi:globe"
            className="text-xl cursor-pointer hover:text-gray-900"
          /> */}
          <img
            src="/assets/Global.png"
            alt="User Avatar"
            className="h-5 w-5 rounded-full"
          />
          <span>Language</span>
          <img
            src="/assets/DropDown.png"
            alt="User Avatar"
            className="h-6 w-6 rounded-full"
          />
          <div className="border-l border-gray-300 h-6"></div>
          <Icon
            icon="mdi:bell-outline"
            className="text-2xl cursor-pointer hover:text-gray-900"
          />
          <Icon
            icon="mdi:cog-outline"
            className="text-2xl cursor-pointer hover:text-gray-900"
            onClick={() => navigate('/settings')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
