import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef();

  const handleUserClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setShowSettingsMenu((prev) => !prev);
  };

const handleLogout = () => {
  console.log("Token before removal:", localStorage.getItem("accessToken"));
  localStorage.removeItem("accessToken");
  console.log("Token after removal:", localStorage.getItem("accessToken"));
  window.location.replace("/login ");
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-gray-100 p-3 border-b border-gray-300 shadow">
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
          <span
            onClick={handleUserClick}
            className="text-gray-700 font-medium cursor-pointer hover:underline"
          >
            {name}
          </span>
          <img
            src="/assets/DropDown.png"
            alt="User Avatar"
            className="h-6 w-6 rounded-full"
          />
        </div>
        <div className="border-l border-gray-300 h-6"></div>

        <div className="flex items-center space-x-2 text-gray-600 relative" ref={settingsRef}>
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
          <div className="relative">
            <Icon
              icon="mdi:cog-outline"
              className="text-2xl cursor-pointer hover:text-gray-900"
              onClick={handleSettingsClick}
            />
            {showSettingsMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowSettingsMenu(false);
                    navigate("/control-panel");
                  }}
                >
                  Go to Control Panel
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
