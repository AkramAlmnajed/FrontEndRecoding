import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

const aspectSubAspectMapping = {
  "Culture & Heritage": [
    "Identity",
    "Layers of the City",
    "Tangible Heritage",
    "Intangible Heritage",
  ],
  "Building code & Policy": [
    "Ownership Rights",
    " Safety Standards",
    "Structural Integrity",
    "Energy Materials Efficiency",
    " Accessibility & Inclusivity",
    "Health & Sanitation",
    " Adaptability & Resilience",
  ],
  "Economic Factor": [
    "International Aid",
    " Employment Development",
    "Economic Diversification",
    "Tourism",
    "Financial Insecurity",
  ],

  "Public Health": [
    "Health Care System",
    "Physical Health & Disability",
    "Disease Management",
    "Nutrition",
    "Medication",
    "Psych & Mental Health",
  ],
  "Resources Management": [
    "Capacity building",
    " Water Resources",
    "Food insecurity ",
    " Material Resources ",
    "Energy Resources ",
  ],
  "Urban planning": [
    "Public Spaces",
    "Amenities",
    "Housing & Building",
    "Population",
    "Land Use",
    " Infrastructure",
    "Urban Transformation",
    "Network & Mobility",
  ],
  "Data Collection & Analysis": [
    "Official Statistics",
    " Research Tools",
    " Mapping Tools",
  ],
  "Technology & Digital Infrastructure": [
    "Social Networking",
    "Online Platforms",
    " Hi-Technology & AI",
    "Digital Connectivity",
  ],
  "Ecological Factor": [
    "Green Spaces",
    "Waste Management",
    " Water & Air Quality",
    "Climate",
    " Natural Disaster",
    "Agriculture",
  ],
  "Social Factor": [
    "Civil Peace",
    "Immigration",
    "Local Community",
    "Adaptation",
    "Education System",
    "Community Engagement",
  ],
};

const Sidebar = () => {
  const [aspect, setAspect] = useState("");
  const [subAspects, setSubAspects] = useState([]);
  const [selectedSubAspect, setSelectedSubAspect] = useState("");

  const handleAspectChange = (e) => {
    const input = e.target.value.trim(); // trimming spaces
    setAspect(input);

    // Find matching aspect (exact match first)
    const matched = Object.keys(aspectSubAspectMapping).find(
      (key) => key.toLowerCase() === input.toLowerCase()
    );

    if (matched) {
      setSubAspects(aspectSubAspectMapping[matched]);
    } else {
      setSubAspects([]);
    }
    setSelectedSubAspect("");
  };

  const handleSubAspectChange = (e) => {
    setSelectedSubAspect(e.target.value);
  };

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
            <option value="" disabled selected>
              Category
            </option>
            <option value="option1">Residential Architecure</option>
            <option value="option2">Interior Design</option>
            <option value="option3">Cultural Architecture</option>
            <option value="option4">Commercial & Offices</option>
            <option value="option5">Public architecture</option>
            <option value="option6">Commercial & Offices</option>
            <option value="option7">HealthCare Architecture</option>
            <option value="option8">Educational Architecture</option>
            <option value="option9">Sports Architecture</option>
            <option value="option10">Religious Architecture</option>
            <option value="option11">Industrial &Infrastructer</option>
            <option value="option12">Landscape & Urbanism </option>
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
            <option value="" disabled selected>
              Category
            </option>
            <option value="option1">Residential Architecure</option>
            <option value="option2">Interior Design</option>
            <option value="option3">Cultural Architecture</option>
            <option value="option4">Commercial & Offices</option>
            <option value="option5">Public architecture</option>
            <option value="option6">Commercial & Offices</option>
            <option value="option7">HealthCare Architecture</option>
            <option value="option8">Educational Architecture</option>
            <option value="option9">Sports Architecture</option>
            <option value="option10">Religious Architecture</option>
            <option value="option11">Industrial &Infrastructer</option>
            <option value="option12">Landscape & Urbanism </option>
          </select>
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Sub-Aspect.png"
            alt="Icon"
            className="absolute left-2 h-7 w-4"
          />
          <select
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
            disabled={subAspects.length === 0}
          >
            <option value="" disabled selected={!subAspects.length}>
              {subAspects.length ? " Sub-aspect" : "No Sub-aspects"}
            </option>

            {subAspects.map((subAspect, index) => (
              <option key={index} value={subAspect}>
                {subAspect}
              </option>
            ))}
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
            src="/assets/Aspect.png"
            alt="Icon"
            className="absolute left-2 h-4 w-4"
          />
          <input
            type="text"
            placeholder="Aspect"
            value={aspect}
            onChange={handleAspectChange}
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none"
          />
        </div>
        <div className="relative flex items-center">
          <img
            src="/assets/Sub-Aspect.png"
            alt="Icon"
            className="absolute left-2 h-7 w-4"
          />
          <select
            className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none"
            value={selectedSubAspect}
            onChange={handleSubAspectChange}
            disabled={subAspects.length === 0}
          >
            <option value="" disabled selected={!subAspects.length}>
              {subAspects.length ? " Sub-aspect" : "No Sub-aspects"}
            </option>
            {subAspects.map((subAspect, index) => (
              <option key={index} value={subAspect}>
                {subAspect}
              </option>
            ))}
          </select>
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
            className="relative flex items-center mt-2"
            id="upload"
            accept="image/*"
            placeholder="Upload Image"
            style={{ display: "none" }} // Hides the default file input
          />

          <label
            htmlFor="upload"
            className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer"
          >
            Upload Image
          </label>
          <div>
            <button
              onClick={() => document.getElementById("upload").click()}
              className="absolute right-2 p-2 rounded cursor-pointer"
              style={{ backgroundColor: "white", color: "grey", display: "flex", alignItems: "flex-start", gap: "5px"  }} 
            >
              <Icon icon="mdi:upload" style={{ fontSize: "12px",position:"relative", top: "-5px" }} />{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-3 " style={{ marginTop: "30px" }}>
        <button className="flex-1 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700">
          Create
        </button>
        <button className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50">
          Cancel
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
