import { useMarkers } from "../context/MarkersContext";
import SelectAspectSaC from "./SelectAspect";

export default function FilterMarkersForm({
  aspectSelection,
  onAspectSelectionChange 
}) {
  const { setFilterQuery } = useMarkers();

  const handleFilter = () => {
    setFilterQuery({ categories: [aspectSelection.categoryName] });
  };

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2 font-light">
        <img src="/assets/Filter.png" alt="Filter" className="h-5 w-5 md:h-6 md:w-6" />
        <span className="text-sm">Filter layers</span>
      </div>

      <SelectAspectSaC 
        initialValues={aspectSelection}
        onSelectionChange={onAspectSelectionChange} 
      />
      
      <div className="flex justify-center mt-4">
        <button 
          className="w-28 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50 transition-colors" 
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
}