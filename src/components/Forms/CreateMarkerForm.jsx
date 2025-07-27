import axios from "axios";
import { useState } from "react";
import { useMarkers } from "../context/MarkersContext";
import ErrorMessage from "../FormElements/error_message";
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
  const [errorMessage, setErrorMessage] = useState()

  const createMarker = async () => {
    if (!locationName.trim()) {
      alert("Location name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("latitude", clickedPosition.lat.toString());
    formData.append("longitude", clickedPosition.lng.toString());
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
      setErrorMessage(null);
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
      onCancel();
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMsg = errors[firstErrorKey]?.[0];

        setErrorMessage(firstErrorMsg || "Validation error occurred.");
      } else {
        setErrorMessage("Failed to create marker.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex items-center mb-4 space-x-2 font-light">
        <img src="/assets/Marker.png" alt="Marker" className="h-5 w-5 md:h-6 md:w-6" />
        <span className="text-sm">Create Marker</span>
      </div>

      <SelectAspectSaC
        initialValues={aspectSelection}
        onSelectionChange={onAspectSelectionChange}
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
        />
      </div>

      {/* Image Upload */}
      <div className="relative flex items-center mt-6 mb-3">
        <img
          src="/assets/Uplode.png"
          alt="Upload"
          className="absolute left-2 h-4 w-4"
        />
        <input
          type="file"
          className="hidden"
          id="upload-images"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setImages(Array.from(e.target.files));
            }
          }}
        />
        <label
          htmlFor="upload-images"
          className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer hover:text-gray-700"
        >
          Upload Images
        </label>
        {images.length > 0 && (
          <div className="ml-10 mt-8">
            <ul className="text-xs text-gray-600 space-y-1">
              {images.map((img, index) => (
                <li key={index} className="truncate">{img.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* PDF Upload */}
      <div className="relative flex items-center mt-4 mb-8">
        <img
          src="/assets/Uplode.png"
          alt="Upload"
          className="absolute left-2 h-4 w-4"
        />
        <input
          type="file"
          className="hidden"
          id="upload-pdfs"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              console.log("raw selected:", e.target.files);
              setPdfs(Array.from(e.target.files));
            }
          }}
        />
        <label
          htmlFor="upload-pdfs"
          className="absolute left-10 text-gray-500 text-sm mt-1 cursor-pointer hover:text-gray-700"
        >
          Upload PDFs
        </label>
        {pdfs.length > 0 && (
          <div className="ml-10 mt-8">
            <ul className="text-xs text-gray-600 space-y-1">
              {pdfs.map((pdf, index) => (
                <li key={index} className="truncate">{pdf.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4 mb-4">
        <ErrorMessage message={errorMessage} />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-10">
        <button
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${isSubmitting
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-cyan-600 text-white hover:bg-cyan-700"
            }`}
          onClick={createMarker}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
        <button
          className="flex-1 py-2 border border-cyan-600 text-cyan-600 rounded-full text-sm font-medium hover:bg-cyan-50 transition-colors"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateMarkerForm;