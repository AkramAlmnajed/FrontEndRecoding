import { useState } from "react";
import { Icon } from "@iconify/react";

const SettingsSidebar = ({ onSelect, selected }) => {
  const [securityOpen, setSecurityOpen] = useState(false);

  const handleSecurityClick = () => {
    setSecurityOpen(!securityOpen);
  };

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-300 flex flex-col pt-16 px-4">
      <nav className="flex flex-col space-y-2">
        {/* Edit Profile */}
        <button
          onClick={() => onSelect("editProfile")}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            selected === "editProfile"
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <img src="/assets/Pen.png" className="w-5 h-5" alt="Edit" />
          <span>Edit Profile</span>
        </button>

        {/* Security */}
        <button
          onClick={handleSecurityClick}
          className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
            selected === "changeEmail" || selected === "changePass"
              ? "text-black font-semibold"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <span className="flex items-center space-x-3">
            <Icon icon="mdi:lock-outline" className="w-5 h-5" />
            <span>Security</span>
          </span>
          <span className="text-gray-400">{securityOpen ? "▲" : "▼"}</span>
        </button>

        {/* Sub-options */}
        {securityOpen && (
          <div className="flex flex-col ml-6 mt-1 space-y-1">
            <button
              onClick={() => onSelect("changeEmail")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                selected === "changeEmail"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <img src="/assets/name.png" className="w-4 h-4" alt="Email" />
              <span>Email</span>
            </button>

            <button
              onClick={() => onSelect("changePass")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                selected === "changePass"
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <img src="/assets/Password.png" className="w-4 h-4" alt="Password" />
              <span>Password</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
