import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef(null);

  const handleSettingsClick = () => {
    setShowSettingsMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { name } = useUser();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex justify-between items-center bg-gray-100 p-2 md:p-3 border-b border-gray-300 shadow">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden p-2 hover:bg-gray-200 rounded-lg"
      >
        <Icon icon="mdi:menu" className="text-2xl text-gray-700" />
      </button>

      {/* Logo Section */}
      <div className="flex items-center space-x-2 md:space-x-6 overflow-x-auto">
        <img
          src="/assets/MOSAICCOLOR.png"
          alt="Recoding Logo"
          className="h-8 md:h-14 flex-shrink-0"
        />
        <div className="hidden sm:block border-l border-gray-300 h-6"></div>
        <img
          src="/assets/Platform_Horizontal_Transparent.png"
          alt="Post-Crisis Logo"
          className="h-8 md:h-14 flex-shrink-0"
        />
        <div className="hidden lg:block border-l border-gray-300 h-6"></div>
        <img
          src="/assets/FOUNDATION_BLACK.png"
          alt="Reparametrize Logo"
          className="h-8 md:h-14 flex-shrink-0 hidden lg:block"
        />
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* User Info - Hidden on small screens */}
        <button
          onClick={() => navigate("/settings")}
          className="hidden sm:flex items-center space-x-2 focus:outline-none hover:bg-gray-200 px-2 py-1 rounded transition"
          title="Settings"
        >
          <Icon icon="mdi:account" className="h-6 w-6 text-black" />
          <img
            src="/assets/DropDown.png"
            alt="Dropdown"
            className="h-6 w-6 rounded-full"
          />
        </button>
        
        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block border-l border-gray-300 h-6"></div>

        {/* Language Section - Simplified on mobile */}
        <div className="hidden md:flex items-center space-x-2 text-gray-600">
          <img
            src="/assets/Global.png"
            alt="Language"
            className="h-5 w-5 rounded-full"
          />
          <span className="hidden lg:inline">Language</span>
          <img
            src="/assets/DropDown.png"
            alt="Dropdown"
            className="h-6 w-6 rounded-full"
          />
        </div>
        
        {/* Divider */}
        <div className="hidden md:block border-l border-gray-300 h-6"></div>

        {/* Notification Bell */}
        <Icon
          icon="mdi:bell-outline"
          className="text-xl md:text-2xl cursor-pointer hover:text-gray-900 text-gray-600"
        />
        
        {/* Settings Menu */}
        <div className="relative" ref={settingsRef}>
          <Icon
            icon="mdi:cog-outline"
            className="text-xl md:text-2xl cursor-pointer hover:text-gray-900 text-gray-600"
            onClick={handleSettingsClick}
          />
          {showSettingsMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                onClick={() => {
                  setShowSettingsMenu(false);
                  navigate("/control-panel");
                }}
              >
                Go to Control Panel
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
