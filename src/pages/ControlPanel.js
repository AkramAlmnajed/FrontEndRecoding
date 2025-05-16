// src/pages/ControlPanel.jsx
import React from "react";
import { Icon } from "@iconify/react";
import Header from "../components/Header/header";

const usersData = [
  {
    id: 1,
    name: "Jehad Alghamyan",
    position: "Volunteer",
    department: "Public Health",
    layer: "Layer1",
    lastLogin: "15 April, 2025, 07:52 PM",
  },
  {
    id: 2,
    name: "Khaled Ahmad",
    position: "Leader",
    department: "Public Health",
    layer: "Layer2",
    lastLogin: "13 May, 2025, 02:45 AM",
  },
  {
    id: 3,
    name: "Maya Assaf",
    position: "Head",
    department: "Public Health",
    layer: "Layer3",
    lastLogin: "12 Nov, 2025, 10:30 AM",
  },
  {
    id: 4,
    name: "Lana Mohammed",
    position: "Co-Head",
    department: "Public Health",
    layer: "Layer1",
    lastLogin: "7 July, 2025, 08:10 AM",
  },
];

export default function ControlPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-5xl font-light mb-14">Control Panel:</h1>

        <div className="bg-white rounded-xl ">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="text-gray-600">
              All Users:{" "}
              <span className="font-medium text-gray-900">{usersData.length}</span>
            </span>
            <button className="px-4 py-2 text-sm border border-blue-400 text-blue-500 rounded-full hover:bg-blue-50">
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="text-gray-500 text-sm font-medium">
                  <th className="w-12 px-2">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2">USER</th>
                  <th className="px-4">POSITION</th>
                  <th className="px-4">DEPARTMENT</th>
                  <th className="px-4">LAYER</th>
                  <th className="px-4">LAST LOGIN</th>
                  <th className="w-16 px-4">DELETE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData.map((user) => (
                  <tr key={user.id} className="text-gray-700 text-sm">
                    <td className="px-2">
                      <input type="checkbox" />
                    </td>

                    <td className="flex items-center px-4 py-3 space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <span>{user.name}</span>
                    </td>

                    <td className="px-4">
                      <select className="bg-gray-50 text-gray-600 text-sm py-1 px-2 rounded border border-transparent focus:outline-none">
                        <option>{user.position}</option>
                        <option>Volunteer</option>
                        <option>Leader</option>
                        <option>Head</option>
                        <option>Co-Head</option>
                      </select>
                    </td>

                    <td className="px-4">
                      <button className="bg-green-900 text-white text-xs py-1 px-3 rounded-full inline-flex items-center space-x-1">
                        <Icon icon="mdi:heart-outline" width="14" />
                        <span>{user.department}</span>
                      </button>
                    </td>

                    <td className="px-4">
                      <select className="bg-gray-50 text-gray-600 text-sm py-1 px-2 rounded border border-transparent focus:outline-none">
                        <option>{user.layer}</option>
                        <option>Layer1</option>
                        <option>Layer2</option>
                        <option>Layer3</option>
                      </select>
                    </td>

                    <td className="px-4">{user.lastLogin}</td>

                    <td className="px-4">
                      <Icon
                        icon="mdi:delete-outline"
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        width="20"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center pt-4 mt-64">
            <div className="text-gray-500 text-sm">
              Users per page{" "}
              <select className="bg-transparent border-transparent text-sm text-gray-700 underline cursor-pointer focus:outline-none">
                {[10, 25, 50].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="text-gray-500 text-sm">
              Showing {usersData.length} out of {usersData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
