import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 shadow-md flex flex-col space-y-6 text-gray-700">
      <div>
        <div className="flex items-center mb-4 space-x-2 font-light">
          <img src="/assets/Search.png" alt="Search" className="h-6 w-6" />
          <span className="text-sm">Search</span>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Pen.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <input
            type="text"
            placeholder="Marker name"
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none"
          />
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Category.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <select className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
            <option>Category</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button className="w-28 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50">
            Search
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4 space-x-2 font-light">
          <img src="/assets/Filter.png" alt="Filter" className="h-6 w-6" />
          <span className="text-sm">Filter layers</span>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Category.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <select className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
            <option>Category</option>
          </select>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Sub-Aspect.png"
            alt="Icon"
            className="absolute left-2 h-7 w-4"
          />
          <select className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
            <option>Sub-aspect</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button className="w-28 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50">
            Filter
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-4 space-x-2 font-light">
          <img src="/assets/Marker.png" alt="Marker" className="h-6 w-6" />
          <span className="text-sm">Create marker</span>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Pen.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <input
            type="text"
            placeholder="Location name"
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none"
          />
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Category.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <select className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
            <option>Category</option>
          </select>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Descrip.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <textarea
            placeholder="Description"
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
          ></textarea>
        </div>

        <div className="relative flex items-center mt-2">
          <img
            src="/assets/Uplode.png"
            alt="Upload"
            className="absolute left-2 h-4 w-4"
          />
          <input
            type="file"
            className="w-full pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex space-x-2 mt-3">
          <button className="flex-1 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700">
            Create
          </button>
          <button className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50">
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
