import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapClickHandler = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng });
    }
  });
  return null;
};

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [binStatus, setBinStatus] = useState('empty');
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  const handleSubmit = () => {
    if (!coordinates || !image || !comment) {
      alert('Please fill in all required fields and select a location on the map');
      return;
    }

    const formData = new FormData();
    formData.append('lat', coordinates.lat);
    formData.append('lng', coordinates.lng);
    formData.append('binStatus', binStatus);
    formData.append('image', image);
    formData.append('comment', comment);

    axios.post('http://127.0.0.1:8000/api/coordinates/', formData, {
      

      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      console.log('Bin report sent', response);
      setSubmitted(true);
    })
    .catch(error => {
      console.error('Error sending report', error);
    });

    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Bin Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bin Status
            </label>
            <select
              value={binStatus}
              onChange={(e) => setBinStatus(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="empty">Empty</option>
              <option value="half">Half Full</option>
              <option value="full">Full</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all h-32"
              placeholder="Add details about the bin's condition..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Bin Image
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-64 border rounded-xl overflow-hidden shadow-sm">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler setCoordinates={setCoordinates} />
              {coordinates && (
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>
                    Selected location: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          {coordinates && (
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              📍 Selected coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!coordinates || !image || !comment}
          >
            Submit Report
          </button>
        ) : (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg text-center font-semibold">
            ✅ Report submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;