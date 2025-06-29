import { useState } from "react";
import CreateMarkerForm from "../Forms/CreateMarkerForm";
import EditMarkerForm from "../Forms/EditMarkerForm";
import FilterMarkersForm from "../Forms/FilterMarkersForm";
import SearchMarkersForm from "../Forms/SearchMarkersForm";



const Sidebar = ({ showMarkerForm, clickedMarker, position, setPosition, setClickedMarker }) => {

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
    <aside className="w-64 bg-white p-4 shadow-md flex flex-col space-y-6 text-gray-700 overflow-y-auto mt-4 " style={{ height: 'calc(100vh)' }}
    >
      <SearchMarkersForm />

      <FilterMarkersForm aspectSelection={filterSelection}
        onAspectSelectionChange={setFilterSelection} />

      {clickedMarker ? (
        <EditMarkerForm
          markerData={clickedMarker}
          onCancel={() => setClickedMarker(null)}

        />

      ) : showMarkerForm ? (
        <CreateMarkerForm
          aspectSelection={createSelection}
          onAspectSelectionChange={setCreateSelection}
          clickedPosition={position}
          onCancel={() => setPosition(null)}
        />
      ) : null}

    </aside>
  );
};

export default Sidebar;