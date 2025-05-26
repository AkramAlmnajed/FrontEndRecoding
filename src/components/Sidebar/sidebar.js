import { useEffect, useState } from "react";
import MarkerForm from "../Forms/MarkerForm";
import { useUser } from '../context/UserProvider';

const aspectSubAspectMapping = {

  "Culture and heritage": [
    "Identity",
    "Layers of the City",
    "Tangible Heritage",
    "Intangible Heritage",
  ],
  "building code": [
    "Ownership Rights",
    " Safety Standards",
    "Structural Integrity",
    "Energy Materials Efficiency",
    " Accessibility & Inclusivity",
    "Health & Sanitation",
    " Adaptability & Resilience",
  ],
  "economic factor": [
    "International Aid",
    " Employment Development",
    "Economic Diversification",
    "Tourism",
    "Financial Insecurity",
  ],

  "public health": [
    "Health Care System",
    "Physical Health & Disability",
    "Disease Management",
    "Nutrition",
    "Medication",
    "Psych & Mental Health",
  ],
  "resources management": [
    "Capacity building",
    " Water Resources",
    "Food insecurity ",
    " Material Resources ",
    "Energy Resources ",
  ],
  "urban planning": [
    "Public Spaces",
    "Amenities",
    "Housing & Building",
    "Population",
    "Land Use",
    " Infrastructure",
    "Urban Transformation",
    "Network & Mobility",
  ],
  "data collection and analysis": [
    "Official Statistics",
    " Research Tools",
    " Mapping Tools",
  ],
  "technology and infrastructure": [
    "Social Networking",
    "Online Platforms",
    " Hi-Technology & AI",
    "Digital Connectivity",
  ],
  "ecological factor": [
    "Green Spaces",
    "Waste Management",
    " Water & Air Quality",
    "Climate",
    " Natural Disaster",
    "Agriculture",
  ],
  "social factor": [
    "Civil Peace",
    "Immigration",
    "Local Community",
    "Adaptation",
    "Education System",
    "Community Engagement",
  ],
};

const Sidebar = ({ showMarkerForm }) => {

  const { layer } = useUser();
  // const [aspect, setAspect] = useState("");
  const [subAspects, setSubAspects] = useState([]);
  const [selectedSubAspect, setSelectedSubAspect] = useState("");

  // const input = e.target.value.trim(); // trimming spaces
  // setAspect(input);

  // Find matching aspect (exact match first)
  useEffect(() => {
    if (layer) {
      const matched = Object.keys(aspectSubAspectMapping).find(
        (key) => key.toLowerCase() === layer.toLowerCase()
      );
      if (matched) {
        setSubAspects(aspectSubAspectMapping[matched]);
      } else {
        setSubAspects([]);
      }
    }
  }, [layer]);

  const handleSubAspectChange = (e) => {
    setSelectedSubAspect(e.target.value);
  };

  return (
    <aside className="w-64 bg-white p-4 shadow-md flex flex-col space-y-6 text-gray-700 overflow-scroll">
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

      {showMarkerForm && (<MarkerForm aspect={layer}
        subAspects={subAspects}
        selectedSubAspect={selectedSubAspect}
        handleSubAspectChange={handleSubAspectChange}
        title="Create Marker"
        ButtonText='Create'></MarkerForm>)}

    </aside>
  );
  ;

}

export default Sidebar;
