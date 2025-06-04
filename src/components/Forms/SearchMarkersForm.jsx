import { useState } from "react";
import { useMarkers } from "../context/MarkersContext";

export default function SearchMarkersForm() {
  const { setSearchQuery } = useMarkers();
  const [name, setName] = useState("");


  const handleSearch = () => {
    if (!name.trim()) return;
    console.log("Searching for:", name);
    setSearchQuery({ name: name.trim() });
  };

  return (
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Marker name"
          className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button className="w-28 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50" onClick={handleSearch} disabled={!name.trim()}>
          Search
        </button>
      </div>
    </div>
  );
}
