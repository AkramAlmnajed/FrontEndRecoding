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
    const [pdfs, setPdfs] = useState([]);
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
        images.forEach((file) => {
            formData.append("images[]", file);
        });
        pdfs.forEach((file) => {
            formData.append("references[]", file);
        });




        try {
            setIsSubmitting(true);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/locations",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Marker created successfully!");
            await fetchMarkers();
        } catch (error) {
            console.error("Error creating marker:", error);
            if (error.response?.data?.errors) {
                console.log("Validation Errors:", error.response.data.errors);
                alert(JSON.stringify(error.response.data.errors, null, 2));
            } else {
                alert("Failed to create marker.");
            }
        }
    };



    return (
        <div calssName="flex-col">
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

            <div className="relative flex items-center mt-6 mb-3">
                <img
                    src="/assets/Uplode.png"
                    className="absolute left-2 h-4 w-4"
                />
                <input
                    type="file"
                    className="relative flex items-center mt-2"
                    id="upload"
                    accept="image/*"
                    multiple
                    placeholder="Upload Image"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        setImages(Array.from(e.target.files));
                    }}
                />
                <label
                    htmlFor="upload"
                    className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer"
                >
                    Upload Image
                </label>
                {images.length > 0 && (
                    <ul className="text-sm text-gray-600 ml-10 mt-1 list-disc">
                        {images.map((img, index) => (
                            <li key={index}>{img.name}</li>
                        ))}
                    </ul>
                )}


            </div>

            <div className="relative flex flex-col mt-4 mb-8 items-center">
                <img
                    src="/assets/Uplode.png"
                    className="absolute left-2 h-4 w-4"
                />
                <input
                    type="file"
                    className="relative flex items-center mt-2 mb-4"
                    id="upload-pdf"
                    accept="application/pdf"
                    multiple
                    placeholder="Upload Pdf"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        console.log("raw selected:", e.target.files);
                        setPdfs(Array.from(e.target.files));
                    }}
                />
                <label
                    htmlFor="upload-pdf"
                    className="absolute left-10 text-gray-500 text-sm mt-1 mb-4 cursor-pointer"
                >
                    Upload Pdf
                </label>
                {pdfs.length > 0 && (
                    <ul className="text-sm text-gray-600 ml-10 mt-1 list-disc">
                        {pdfs.map((pdf, index) => (
                            <li key={index}>{pdf.name}</li>
                        ))}
                    </ul>
                )}


            </div>
            <div className="flex space-x-2 mt-10">
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
