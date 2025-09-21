import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef(null);
  const { user } = useUser();

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

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block border-l border-gray-300 h-6"></div>



        {/* Notification Bell */}
        <Icon
          icon="mdi:bell-outline"
          className="text-xl md:text-2xl cursor-pointer hover:text-gray-900 text-gray-600"
        />

        {/* Settings Menu */}
        <div className="relative" ref={settingsRef}>
          <img
            src={
              user?.profile_image
                ? (user.profile_image.startsWith("http")
                  ? user.profile_image
                  : `http://127.0.0.1:8000/storage/${user.profile_image}`)
                : "/assets/profile.png"
            }
            alt="User profile"
            className="w-7 h-7 md:w-10 md:h-10 rounded-full object-cover cursor-pointer border border-gray-300"
            onClick={handleSettingsClick}
          />
          {showSettingsMenu && (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
    
    {/* Profile Section */}
    <div className="px-4 py-3 border-b border-gray-100">
      <p className="text-sm font-medium text-gray-900">{user?.name || "Guest User"}</p>
      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
    </div>

    {/* Menu Options */}
    <div className="flex flex-col py-2">
      <button
        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 text-sm transition-colors"
        onClick={() => {
          setShowSettingsMenu(false);
          navigate("/profile");
        }}
      >
        Profile
      </button>

      <button
        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 text-sm transition-colors"
        onClick={() => {
          setShowSettingsMenu(false);
          navigate("/control-panel");
        }}
      >
        Control Panel
      </button>
    </div>

    <div className="border-t border-gray-100">
      <button
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </header>
  );
};

export default Header;
