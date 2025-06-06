import { useEffect, useState } from "react";
import { useUser } from '../context/UserProvider';
import FilterMarkersForm from "../Forms/FilterMarkersForm";
import MarkerForm from "../Forms/MarkerForm";
import SearchMarkersForm from "../Forms/SearchMarkersForm";

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

const categoryOptions = [
  "Hospital",
  "School",
  "Market",
  "Park",
  "Government Building"
];

const Sidebar = ({ showMarkerForm, clickedMarker }) => {

  const { layer } = useUser();
  const [subAspects, setSubAspects] = useState([]);
  const [selectedSubAspect, setSelectedSubAspect] = useState("");

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
    <aside className="w-64 bg-white p-4 shadow-md flex flex-col space-y-6 text-gray-700 overflow-scroll mt-4">
      <SearchMarkersForm />

      <FilterMarkersForm categories={categoryOptions} subAspects={subAspects} />

      {clickedMarker ? (
        <MarkerForm
          aspect={layer}
          subAspects={subAspects}
          selectedSubAspect={selectedSubAspect}
          handleSubAspectChange={handleSubAspectChange}
          categories={categoryOptions}
          title="Edit Marker"
          ButtonText="Edit"
          markerData={clickedMarker} // Pass the marker data here
        />
      ) : showMarkerForm ? (
        <MarkerForm
          aspect={layer}
          subAspects={subAspects}
          selectedSubAspect={selectedSubAspect}
          handleSubAspectChange={handleSubAspectChange}
          categories={categoryOptions}
          title="Create Marker"
          ButtonText="Create"
        />
      ) : null}

    </aside>
  );
};

export default Sidebar;
