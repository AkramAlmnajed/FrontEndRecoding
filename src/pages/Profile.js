import React, { useState } from "react";
import Header from "../components/Header/header";
import { Icon } from "@iconify/react";

export default function Profile() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static top-0 left-0 h-full w-80 bg-gray-50 border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-80 lg:pt-8 lg:px-6 lg:mt-60
          pt-20 px-6
        `}>
          {/* Mobile Close Button */}
          <button 
            className="lg:hidden absolute top-4 right-4 p-2"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon icon="mdi:close" width="24" />
          </button>

          <ul className="space-y-8 mt-8 lg:mt-0">
            <li className="flex items-center text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
              <Icon icon="mdi:pencil-outline" width="40" className="mr-3" />
              <span className="text-xl lg:text-2xl">Edit Profile</span>
            </li>
            <li className="flex items-center text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
              <Icon icon="mdi:account-box-outline" width="40" className="mr-3" />
              <span className="text-xl lg:text-2xl">Position</span>
            </li>
            <li className="flex items-center text-black font-medium">
              <Icon icon="mdi:lock-outline" width="40" className="mr-3" />
              <span className="text-xl lg:text-2xl">Security</span>
            </li>
          </ul>
        </aside>

        {/* Vertical Divider - Hidden on Mobile */}
        <div className="hidden lg:block border-l border-gray-200 self-center h-[60vh]" />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-10 relative">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden fixed top-20 left-4 z-30 bg-white p-2 rounded-lg shadow-md border"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon icon="mdi:menu" width="24" />
          </button>

          <div className="bg-white lg:bg-gray-50 p-4 lg:p-8 rounded-xl max-w-4xl mx-auto mt-8 lg:mt-24 shadow-sm lg:shadow-none">
            {/* Profile Section */}
            <div className="flex flex-col lg:flex-row lg:items-center mb-8 lg:mb-0">
              <div className="w-24 h-24 lg:w-40 lg:h-32 bg-gray-300 rounded-full mx-auto lg:mx-0 lg:mr-6 mb-4 lg:mb-0" />
              
              <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-5xl font-light mb-2 lg:mb-4">Jehad Alghamyan</h1>
                <p className="text-gray-400 text-sm lg:text-base">jegh505@gmail.com</p>
                <p className="text-gray-400 text-sm lg:text-base">Volunteer, Public Health</p>
              </div>
            </div>

            {/* Password Change Form */}
            <div className="mt-8 lg:mt-10">
              <h2 className="text-xl lg:text-3xl font-normal mb-4 lg:mb-6 text-center lg:text-left">Change Password:</h2>
              
              <form className="space-y-4 lg:space-y-6 max-w-md mx-auto lg:mx-0">
                {/* Current Password */}
                <div className="relative">
                  <Icon
                    icon="mdi:key-outline"
                    className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    width="20"
                  />
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full pl-10 pr-10 border-b border-gray-200 focus:outline-none focus:border-blue-500 py-3 bg-transparent text-sm lg:text-base transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      icon={showCurrent ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                      width="20"
                    />
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <Icon
                    icon="mdi:key-outline"
                    className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    width="20"
                  />
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full pl-10 pr-10 border-b border-gray-200 focus:outline-none focus:border-blue-500 py-3 bg-transparent text-sm lg:text-base transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      icon={showNew ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                      width="20"
                    />
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Icon
                    icon="mdi:key-outline"
                    className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    width="20"
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-10 border-b border-gray-200 focus:outline-none focus:border-blue-500 py-3 bg-transparent text-sm lg:text-base transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      icon={showConfirm ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                      width="20"
                    />
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-4 lg:pt-6">
                  <button
                    type="submit"
                    className="w-full lg:w-auto lg:px-12 py-3 border border-blue-400 text-blue-500 rounded-full text-sm uppercase tracking-wide hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}