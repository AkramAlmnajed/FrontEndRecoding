import React, { useState } from "react";
import Header from "../components/Header/header";
import { Icon } from "@iconify/react";
// import profilePic from "../assets/avatar.jpg"; // ← swap in your real image

export default function Profile() {
  const [showCurrent, setShowCurrent] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <aside className="w-80 pt-8 px-6 mt-60">
          <ul className="space-y-8">
            <li className="flex items-center text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
              <Icon icon="mdi:pencil-outline" width="40" className="mr-3" />
              <span className="text-2xl">Edit Profile</span>
            </li>
            <li className="flex items-center text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
              <Icon
                icon="mdi:account-box-outline"
                width="40"
                className="mr-3"
              />
              <span className="text-2xl">Position</span>
            </li>
            <li className="flex items-center text-black font-medium">
              <Icon icon="mdi:lock-outline" width="40" className="mr-3" />
              <span className="text-2xl">Security</span>
            </li>
          </ul>
        </aside>

        <div className="border-l border-gray-200 self-center h-[60vh]" />

        <main className="flex-1 p-10 relative">
          <div className="relative bg-gray-50 p-8 rounded-xl  max-w-lg mx-auto mt-24">
            <div className="flex items-center">
              <div className="w-40 h-32 bg-gray-300 rounded-full mr-2" />

              <div>
                <h1 className="text-5xl font-light mb-4">Jehad Alghamyan</h1>
                <p className="text-gray-400">jegh505@gmail.com</p>
                <p className="text-gray-400">Volunteer, Public Health</p>
              </div>
            </div>

            <h2 className="mt-10 text-3xl font-normal">Change Password:</h2>
            <form className="mt-6 space-y-6">
              <div className="relative">
                <Icon
                  icon="mdi:key-outline"
                  className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current Password"
                  className="w-full pl-10 border-b border-gray-200 focus:outline-none py-2 bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                >
                  <Icon
                    icon={
                      showCurrent ? "mdi:eye-off-outline" : "mdi:eye-outline"
                    }
                    width="20"
                  />
                </button>
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:key-outline"
                  className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 "
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full pl-10 border-b border-gray-200 focus:outline-none py-2 bg-gray-50"
                />
              </div>

              <div className="relative">
                <Icon
                  icon="mdi:key-outline"
                  className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-10 border-b border-gray-200 focus:outline-none py-2 bg-gray-50"
                />
              </div>

              <button
                type="submit"
                className="w-96 ml-10 py-3 border border-blue-400 text-black-500 rounded-full text-sm uppercase tracking-wide hover:bg-blue-50 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
