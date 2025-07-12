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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {locationData?.name || 'Location Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon icon="mdi:close" className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Icon icon="mdi:loading" className="text-2xl text-gray-400 animate-spin" />
              <span className="ml-2 text-gray-600">Loading details...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <Icon icon="mdi:alert-circle" className="text-3xl text-red-500 mx-auto mb-2" />
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchLocationDetails}
                className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {locationData && !isLoading && !error && (
            <div className="space-y-6">
              {/* Category */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Category:</h3>
                <p className="text-gray-800">{locationData.category?.name}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description:</h3>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {locationData.description}
                </p>
              </div>

              {/* Aspect & Sub-aspect */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Aspect:</h3>
                  <p className="text-gray-800">{locationData.aspect?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Sub-aspect:</h3>
                  <p className="text-gray-800">{locationData.sub_aspect?.name}</p>
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Latitude:</h3>
                  <p className="text-gray-800">{locationData.latitude}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Longitude:</h3>
                  <p className="text-gray-800">{locationData.longitude}</p>
                </div>
              </div>

              {/* User Information */}
              {locationData.user && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Created by:</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">{locationData.user.name}</p>
                    <p className="text-sm text-gray-600">{locationData.user.position}</p>
                    <p className="text-sm text-gray-600">{locationData.user.department}</p>
                  </div>
                </div>
              )}

              {/* Images */}
              {locationData.images && locationData.images.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Images:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locationData.images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={`http://127.0.0.1:8000/storage/${image.image_path}`}
                          alt={`Location image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.png';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          <Icon icon="mdi:close" className="text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created:</span> {new Date(locationData.created_at).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span> {new Date(locationData.updated_at).toLocaleDateString()}
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