import { useState } from "react";
import { useMarkers } from "../context/MarkersContext";

export default function FilterMarkersForm({ categories, subAspects }) {
    const { setFilterQuery } = useMarkers();
    const [category, setCategory] = useState("");
    const [subAspect, setSubAspect] = useState("");

    const handleFilter = () => {
        setFilterQuery({ category, subAspect });
    };

    return (
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
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none">
                    <option value="" disabled selected>
                        Category
                    </option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
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
                <button className="w-28 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50" onClick={handleFilter}>
                    Filter
                </button>
            </div>
        </div>
    );
}
