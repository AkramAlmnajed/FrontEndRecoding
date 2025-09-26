import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useMarkers } from '../context/MarkersContext';
import ErrorMessage from '../FormElements/error_message';
import DeletePopup from '../PopUp/DeletePopup';


const ViewDetailsDialog = ({ isOpen, onClose, location }) => {
  const [openDeleteImage, setOpenDeleteImage] = useState(false)
  const [openDeletePdf, setOpenDeletePdf] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { fetchSpecificMarker } = useMarkers()
  const [locationData, setLocationData] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null)
  const [uploadError, setUploadError] = useState(null)

  useEffect(() => {
    if (location) {
      setLocationData(location);
    }
  }, [location]);

  const token = localStorage.getItem("accessToken")
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !locationData) return null;

  async function uploadFilesImages(files, type) {
    setUploadError(null);
    setDeleteError(null);
    try {
      const formData = new FormData();

      files.forEach((file) => {
        if (type === "images") {
          formData.append("images[]", file);
        } else if (type === "references") {
          formData.append("references[]", file);
        }
        console.log("Uploading type:", type, "files:", files);

      });

      await api.post(`locations/${locationData.id}/upload-files`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const updatedData = await fetchSpecificMarker(locationData.id)
      if (updatedData) {
        setLocationData(updatedData.location);
      }
    }
    catch (error) {
      if (error.response) {
        setUploadError(error.response?.data?.message)
      }
      else {
        setUploadError(error.message)
      }
    }
  }

  async function deleteImage(imageId) {
    setDeleteError(null);
    setUploadError(null);
    try {
      await api.delete(`locations/${locationData.id}/delete-image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLocationData(prev => ({
        ...prev,
        images: prev.images.filter(img => img.id !== imageId)
      }));

      setOpenDeleteImage(false);
      setSelectedImage(null);

    } catch (error) {
      if (error.response) {
        console.error("API error:", error.response.status, error.response.data);
        setDeleteError(error.response?.data?.message)
      } else {
        console.error("Request error:", error.message);
        setDeleteError(error.message)
      }
    }
  }

  async function deleteFile(referenceId) {
    try {
      setDeleteError(null);
      setUploadError(null);
      const response = await api.delete(`locations/${locationData.id}/delete-reference/${referenceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLocationData(prev => ({
        ...prev,
        references: prev.references.filter(ref => ref.id !== referenceId)
      }));
      setSelectedFile(null);
      setOpenDeletePdf(false);

    }
    catch (error) {
      if (error.response) {
        console.error("API error:", error.response.status, error.response.data);
        setDeleteError(error.response?.data?.message)
      } else {
        console.error("Request error:", error.message);
        setDeleteError(error.message)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[999] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Icon icon="mdi:map-marker" className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {locationData?.name || 'Location Details'}
                </h2>
                <p className="text-gray-200 text-sm">
                  ID: {locationData?.id} • Detailed Information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <Icon icon="mdi:close" className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading location details...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:alert-circle" className="text-4xl text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center space-x-2"
              >
                <Icon icon="mdi:refresh" className="text-lg" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {locationData && !isLoading && !error && (
            <div className="p-6 space-y-6">
              {/* Basic Information Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:information" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Location Name</label>
                      <p className="text-gray-800 font-medium text-lg mt-1">{locationData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</label>
                      <div className="flex items-center mt-1">
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {locationData.category?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Aspect</label>
                      <p className="text-gray-800 font-medium mt-1">{locationData.aspect?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sub-Aspect</label>
                      <p className="text-gray-800 font-medium mt-1">{locationData.sub_aspect?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:text-box" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {locationData.description || 'No description available.'}
                  </p>
                </div>
              </div>

              {/* Location Coordinates Card */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:crosshairs-gps" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Geographic Coordinates</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Latitude</label>
                    <p className="text-gray-800 font-mono text-lg font-semibold mt-1">{locationData.latitude}°</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Longitude</label>
                    <p className="text-gray-800 font-mono text-lg font-semibold mt-1">{locationData.longitude}°</p>
                  </div>
                </div>
              </div>

              {/* User Information Card */}
              {locationData.user && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Icon icon="mdi:account-circle" className="text-2xl text-gray-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">Created By</h3>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-gray-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {locationData.user.profile_image ? (
                          <img
                            src={locationData.user.profile_image}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <Icon icon="mdi:account" className="text-2xl text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">{locationData.user.name}</h4>
                            <p className="text-gray-600 font-medium">{locationData.user.position}</p>
                            <p className="text-gray-600 text-sm">{locationData.user.department}</p>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                              <p className="text-gray-700 text-sm">{locationData.user.email}</p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Layer</label>
                              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium ml-2">
                                {locationData.user.layer}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon
                                icon={locationData.user.is_verified ? "mdi:check-circle" : "mdi:clock-outline"}
                                className={`text-lg ${locationData.user.is_verified ? 'text-green-500' : 'text-orange-500'}`}
                              />
                              <span className={`text-sm font-medium ${locationData.user.is_verified ? 'text-green-700' : 'text-orange-700'}`}>
                                {locationData.user.is_verified ? 'Verified User' : 'Pending Verification'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Images Gallery */}

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:image-multiple" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Image Gallery</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
                  {(locationData.images || []).map((image, index) => (
                    <div key={image.id} className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <img
                        src={`http://127.0.0.1:8000/${image.image_path}`}
                        alt={`Location image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png';
                        }}
                      />
                      {/* Bin Icon */}
                      <button
                        onClick={() => {
                          setSelectedImage(image.id);
                          setOpenDeleteImage(true);
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-red-100 transition-colors  z-50"
                      >
                        <Icon
                          icon="mdi:delete"
                          className="text-gray-600 group-hover:text-red-600 transition-colors"
                        />
                      </button>

                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Image {index + 1}</p>
                        <p className="text-xs text-gray-300">Added {formatDate(image.created_at)}</p>
                      </div>
                    </div>
                  ))}

                  <div
                    className="relative flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors duration-300"
                  >
                    <input type="file" multiple accept="image/jpeg,image/png,image/jpg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        uploadFilesImages(files, "images")
                      }}
                    />
                    <Icon icon="mdi:plus" className="text-5xl text-gray-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                </div>
                {deleteError && deleteError.toLowerCase().includes("image") && (
                  <ErrorMessage message={deleteError} />
                )}
                {uploadError && uploadError.toLowerCase().includes("image") && (
                  <ErrorMessage message={uploadError} />
                )}
              </div>

              {/* References Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:link-variant" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Documents</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(locationData.references || []).map((reference, index) => (
                    <div
                      key={index}
                      className="group relative rounded-lg border border-gray-200 p-4 hover:shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300"
                    >
                      {/* Bin Icon */}
                      <button
                        onClick={() => {
                          setSelectedFile(reference.id)
                          setOpenDeletePdf(true)
                        }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-red-100 transition-colors  z-50"
                      >
                        <Icon
                          icon="mdi:delete"
                          className="text-gray-600 group-hover:text-red-600 transition-colors"
                        />
                      </button>

                      <a
                        href={`http://127.0.0.1:8000/${reference.pdf_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          icon="mdi:file-outline"
                          className="text-6xl text-teal-600 mb-3 group-hover:scale-105 transition-transform"
                        />
                      </a>

                      {/* File name */}
                      <p className="text-sm font-medium text-gray-800 truncate w-full px-2">
                        {reference.file_name || `Reference ${index + 1}`}
                      </p>
                    </div>
                  ))}

                  <div
                    className=" relative flex items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition-colors duration-300"
                  >
                    <input type="file" multiple accept=".txt,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        uploadFilesImages(files, "references")
                      }}
                    />
                    <Icon icon="mdi:plus" className="text-5xl text-gray-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                </div>
                {deleteError && deleteError.toLowerCase().includes("reference") && (
                  <ErrorMessage message={deleteError} />
                )}
                {uploadError && uploadError.toLowerCase().includes("reference") && (
                  <ErrorMessage message={uploadError} />
                )}
              </div>


              {/* Timestamps Card */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Icon icon="mdi:clock-outline" className="text-2xl text-gray-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Timeline Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Icon icon="mdi:calendar-plus" className="text-lg text-green-600 mr-2" />
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</label>
                    </div>
                    <p className="text-gray-800 font-medium">{formatDate(locationData.created_at)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Icon icon="mdi:calendar-edit" className="text-lg text-gray-600 mr-2" />
                      <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Updated</label>
                    </div>
                    <p className="text-gray-800 font-medium">{formatDate(locationData.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {openDeleteImage && <DeletePopup
        onDelete={() => {
          deleteImage(selectedImage)
        }}
        onCancel={() => setOpenDeleteImage(false)}
      ></DeletePopup>}

      {openDeletePdf && (<DeletePopup
        onDelete={() => {
          deleteFile(selectedFile)
        }}
        onCancel={() => setOpenDeletePdf(false)}
      ></DeletePopup>)}
    </div>

  );
};

export default ViewDetailsDialog;