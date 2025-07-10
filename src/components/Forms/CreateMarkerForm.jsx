import axios from "axios";
import { useState } from "react";
import { useMarkers } from "../context/MarkersContext";
import SelectAspectSaC from "./SelectAspect";

const CreateMarkerForm = ({
    aspectSelection,
    onAspectSelectionChange,
    clickedPosition,
    onCancel
}) => {
    const [locationName, setLocationName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem("accessToken");
    const { fetchMarkers } = useMarkers();





    const createMarker = async () => {
        if (!locationName.trim()) {
            alert("Location name is required.");
            return;
        }

        const formData = new FormData();
        formData.append("latitude", clickedPosition.lat);
        formData.append("longitude", clickedPosition.lng);
        formData.append("name", locationName.trim());
        formData.append("description", description.trim());
        formData.append("category_id", aspectSelection.categoryId);
        formData.append("aspect_id", aspectSelection.aspectId);
        formData.append("sub_aspect_id", aspectSelection.subAspectId);
        if (images.length > 0) {
            images.forEach((file) => {
                formData.append("images[]", file);
            });
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/locations",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Server Response:", response.data);
            alert("Marker created successfully!");
            await fetchMarkers();
        } catch (error) {
            console.error("Error creating marker:", error);
            alert("Failed to create marker.");
        }
    };


    return (
        <div>
            <div className="flex items-center mb-4 space-x-2 font-light">
                <img src="/assets/Marker.png" alt="Marker" className="h-6 w-6" />
                <span className="text-sm">Create Marker</span>
            </div>

            <SelectAspectSaC initialValues={aspectSelection}
                onSelectionChange={onAspectSelectionChange} />


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
                    onChange={(e) => setImages(e.target.files[0])}

                />
                <label
                    htmlFor="upload"
                    className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer"
                >
                    Upload Image
                </label>

            </div>
            <div className="flex space-x-2 mt-6">
                <button
                    className={`flex-1 py-2 rounded-full text-sm ${isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-cyan-600 text-white hover:bg-cyan-700"
                        }`}
                    onClick={createMarker}
                    disabled={isSubmitting}
                >
                    Create
                </button>
                <button className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm hover:bg-cyan-50"
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CreateMarkerForm;
