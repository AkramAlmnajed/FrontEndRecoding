import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useMarkers } from '../context/MarkersContext';
import ErrorMessage from '../FormElements/error_message';
import SelectAspectSaC from "./SelectAspect";

const EditMarkerForm = ({
    onCancel,
    markerData,
    onViewDetails
}) => {
    const [locationName, setLocationName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aspectSelection, setAspectSelection] = useState({
        aspectId: "",
        subAspectId: "",
        categoryId: ""
    });
    const [errorMessage, setErrorMessage] = useState()
    const { deleteMarker, fetchMarkers } = useMarkers();
    const [deleteErrors, setDeleteErrors] = useState();
    const token = localStorage.getItem("accessToken");
    // const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        if (markerData) {
            setLocationName(markerData.location.name || "");
            setDescription(markerData.location.description || "");
            setAspectSelection({
                aspectId: markerData.location.aspect_id,
                subAspectId: markerData.location.sub_aspect_id,
                categoryId: markerData.location.category_id,
            });
        } else {
            console.log("no marker data");
        }
    }, [markerData]);

    const handleDelete = async () => {
        if (!markerData?.location?.id) {
            console.error("No marker ID to delete");
            return;
        }

        try {
            setIsSubmitting(true);
            deleteMarker(markerData.location.id);
            onCancel();
        } catch (error) {
            console.error("Error deleting marker:", error);
            alert("Failed to delete marker.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        try {
            setIsSubmitting(true);
            setErrorMessage(null);
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
            const url = `http://127.0.0.1:8000/api/locations/${markerData.location.id}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("PUT response:", result);

            if (response.ok) {
                await fetchMarkers();
                onCancel();
                alert("Marker updated successfully!");
            } else {
                const backendMsg =
                    result?.errors?.[Object.keys(result.errors)[0]]?.[0] ||
                    result?.message ||
                    "Failed to update marker.";

                setErrorMessage(backendMsg);
            }
        } catch (error) {
            console.error("Error updating marker:", error);
            setErrorMessage(error.message || "Unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleViewDetailsClick = () => {
        if (markerData?.location?.id && onViewDetails) {
            onViewDetails(markerData.location.id);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 font-light">
                <div className="flex items-center space-x-2">
                    <img src="/assets/Marker.png" alt="Marker" className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-sm">Edit Marker</span>
                </div>

                <button
                    onClick={handleDelete}
                    // onClick={() => { setOpenPopup(true) }}
                    disabled={isSubmitting}
                    className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                >
                    <Icon
                        icon="mdi:trash-can-outline"
                        className="h-4 w-4 text-gray-500 hover:text-red-500"
                    />
                </button>
            </div>
            {/* {openPopup && (
                <DeletePopup
                    onDelete={() => {
                        handleDelete();
                        setOpenPopup(false);
                    }}
                    onCancel={() => setOpenPopup(false)}
                />
            )} */}


            {/* View Details Button */}
            <button
                onClick={handleViewDetailsClick}
                className="w-full mb-4 py-2 bg-cyan-600 text-white rounded-full text-sm font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
            >
                <Icon icon="mdi:eye" className="inline mr-1" />
                View Details
            </button>

            <SelectAspectSaC
                initialValues={{
                    aspectId: markerData?.location.aspect_id,
                    subAspectId: markerData?.location.sub_aspect_id,
                    categoryId: markerData?.location.category_id,
                    categoryName: markerData?.location.category_name,
                }}
                onSelectionChange={setAspectSelection}
            />

            <div className="relative flex items-center">
                <img
                    src="/assets/Pen.png"
                    alt="Icon"
                    className="absolute left-2 h-4 w-4"
                />
                <input
                    type="text"
                    placeholder="Location name"
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm focus:outline-none bg-transparent"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    disabled={isSubmitting}
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
                    className="w-full mt-2 pl-8 p-2 border-b border-gray-400 text-sm bg-transparent focus:outline-none resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    disabled={isSubmitting}
                />
            </div>

            <div className="mt-4 mb-4">
                <ErrorMessage message={errorMessage} />
            </div>

            <div className="flex space-x-2 mt-6">
                <button
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-cyan-600 text-white hover:bg-cyan-700"
                        }`}
                    onClick={handleEdit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
                <button
                    className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm font-medium hover:bg-cyan-50 transition-colors disabled:opacity-50"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditMarkerForm;