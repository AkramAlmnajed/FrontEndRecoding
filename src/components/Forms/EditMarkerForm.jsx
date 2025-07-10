import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useMarkers } from '../context/MarkersContext';
import SelectAspectSaC from "./SelectAspect";


const EditMarkerForm = ({
    onCancel,
    markerData
}) => {
    const [locationName, setLocationName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [aspectSelection, setAspectSelection] = useState({
        aspectId: "",
        subAspectId: "",
        categoryId: ""
    });

    const { deleteMarker, fetchMarkers } = useMarkers();
    const token = localStorage.getItem("accessToken");


    useEffect(() => {
        if (markerData) {
            console.log("marker's data:", markerData)
            setLocationName(markerData.location.name || "");
            setDescription(markerData.location.description || "");
            setAspectSelection({
                aspectId: markerData.location.aspect_id,
                subAspectId: markerData.location.sub_aspect_id,
                categoryId: markerData.location.category_id,
            });
        } else {
            console.log("no marker data")
        }
    }, [markerData]);

    const handleDelete = () => {
        if (!markerData?.location?.id) {
            console.error("No marker ID to delete");
            return;
        }

        deleteMarker(markerData.location.id);
        onCancel();
    };



    const handleEdit = async () => {
        try {
            const payload = {
                name: locationName,
                description: description,
                aspect_id: aspectSelection.aspectId,
                sub_aspect_id: aspectSelection.subAspectId,
                category_id: aspectSelection.categoryId,
                latitude: markerData.location.latitude,
                longitude: markerData.location.longitude,
            };
            console.log("Payload being sent:", payload);
            const url = `http://127.0.0.1:8000/api/locations/${markerData.location.id}`
            console.log("payload sent:", payload)
            const response = await fetch(
                url,

                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();
            console.log("PUT response:", result);

            await fetchMarkers();
            onCancel();
        } catch (error) {
            console.error("Error updating marker:", error);
        }
    };


    return (
        <div>
            <div className="flex items-center justify-between mb-4 font-light">
                <div className="flex items-center space-x-2">
                    <img src="/assets/Marker.png" alt="Marker" className="h-6 w-6" />
                    <span className="text-sm">Edit Marker</span>
                </div>

                <button onClick={handleDelete}>
                    <Icon
                        icon="mdi:trash-can-outline"
                        className="h-4 w-4 text-gray-500 cursor-pointer"
                    />
                </button>
            </div>

            <SelectAspectSaC initialValues={{
                aspectId: markerData?.location.aspect_id,
                subAspectId: markerData?.location.sub_aspect_id,
                categoryId: markerData?.location.category_id,
                categoryName: markerData?.location.category_name,
            }}
                onSelectionChange={setAspectSelection} />


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
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}

                />

                <label
                    htmlFor="upload"
                    className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer"
                >
                    Upload Image
                </label>


            </div>
            <div className="flex space-x-2 mt-6">
                <button className="flex-1 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700"
                    onClick={handleEdit}>
                    Edit
                </button>
                <button className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50"
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditMarkerForm;
