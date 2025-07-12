import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const ViewDetailsDialog = ({ isOpen, onClose, locationId }) => {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationDetails = async () => {
    if (!locationId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:8000/api/locations/${locationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch location details');
      }

      const result = await response.json();
      setLocationData(result.location);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching location details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && locationId) {
      fetchLocationDetails();
    }
  }, [isOpen, locationId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4 animate-fade-in">
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
                onClick={fetchLocationDetails}
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
              {locationData.images && locationData.images.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Icon icon="mdi:image-multiple" className="text-2xl text-gray-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">Image Gallery</h3>
                    <span className="ml-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {locationData.images.length} {locationData.images.length === 1 ? 'Image' : 'Images'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {locationData.images.map((image, index) => (
                      <div key={image.id} className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <img
                          src={`http://127.0.0.1:8000/storage/${image.image_path}`}
                          alt={`Location image ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm font-medium">Image {index + 1}</p>
                          <p className="text-xs text-gray-300">Added {formatDate(image.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References Section */}
              {locationData.references && locationData.references.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Icon icon="mdi:link-variant" className="text-2xl text-gray-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">References</h3>
                  </div>
                  <div className="space-y-3">
                    {locationData.references.map((reference, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-gray-700">{reference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
    </div>
  );
};

export default ViewDetailsDialog;