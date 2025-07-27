import { Icon } from "@iconify/react";
import { useState } from "react";
import CreateMarkerForm from "../Forms/CreateMarkerForm";
import EditMarkerForm from "../Forms/EditMarkerForm";
import FilterMarkersForm from "../Forms/FilterMarkersForm";
import SearchMarkersForm from "../Forms/SearchMarkersForm";

const Sidebar = ({
  showMarkerForm,
  clickedMarker,
  position,
  setPosition,
  setClickedMarker,
  isOpen,
  onClose,
  onViewDetails
}) => {
  const [filterSelection, setFilterSelection] = useState({
    aspectId: "",
    subAspectId: "",
    categoryId: "",
    categoryName: ""
  });

  const [createSelection, setCreateSelection] = useState({
    aspectId: "",
    subAspectId: "",
    categoryId: "",
  });

  return (
    <>
      {/* Mobile Overlay - z-40 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - z-50 */}
      <aside className={`
        fixed md:relative top-0 right-0 h-full
        w-80 md:w-64 bg-white shadow-lg md:shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        z-50 md:z-auto
        flex flex-col
      `}>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Map Controls</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Icon icon="mdi:close" className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 p-4 space-y-6 text-gray-700 overflow-y-auto">
          <SearchMarkersForm />

          <FilterMarkersForm
            aspectSelection={filterSelection}
            onAspectSelectionChange={setFilterSelection}
          />

          {clickedMarker ? (
            <EditMarkerForm
              markerData={clickedMarker}
              onCancel={() => {
                setClickedMarker(null);
                onClose();
              }}
              onViewDetails={onViewDetails}
            />
          ) : showMarkerForm ? (
            <CreateMarkerForm
              aspectSelection={createSelection}
              onAspectSelectionChange={setCreateSelection}
              clickedPosition={position}
              onCancel={() => {
                setPosition(null);
                onClose();
              }}
            />
          ) : null}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;