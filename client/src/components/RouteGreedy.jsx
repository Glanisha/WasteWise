import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RouteGreedy = () => {
    const [bins, setBins] = useState([
        { id: 1, lat: 51.505, lng: -0.09, status: 'FULL' },
        { id: 2, lat: 51.51, lng: -0.1, status: 'EMPTY' },
    ]);
    const [optimalPath, setOptimalPath] = useState(null);
    const [loading, setLoading] = useState(false);
    const [truckPosition, setTruckPosition] = useState(null);
    const truckMarkerRef = useRef(null);

    const center = {
        lat: 51.505,
        lng: -0.09
    };

    const binPositions = bins.map(bin => [
        parseFloat(bin.lat) || center.lat,
        parseFloat(bin.lng) || center.lng
    ]);

    const truckIcon = L.divIcon({
        className: 'custom-truck-icon',
        html: `<div style="
            width: 20px;
            height: 20px;
            background-color: #4a90e2;
            clip-path: polygon(0% 20%, 20% 20%, 20% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 80%, 0% 80%);
            transform: rotate(90deg);
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    useEffect(() => {
        const fetchBins = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/optimalroute/');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBins(data);
                } else if (data.coordinates || data.bins) {
                    setBins(data.coordinates || data.bins);
                }
            } catch (error) {
                console.error('Error fetching bins:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBins();
    }, []);

    const getBinIcon = (status) => {
        const getColor = (status) => {
            switch (status?.toUpperCase()) {
                case 'FULL': return '#ff0000';
                case 'PARTIALLY_FULL': return '#ffff00';
                case 'EMPTY': return '#00ff00';
                default: return '#808080';
            }
        };

        return L.divIcon({
            className: 'custom-bin-icon',
            html: `<div style="
                background-color: ${getColor(status)};
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 2px rgba(0,0,0,0.5);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
    };

    const fetchOptimalRoute = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/optimal-route/');
            const data = await response.json();
            if (data && Array.isArray(data.coordinates)) {
                setOptimalPath(data);
                const pathPositions = data.coordinates.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]);
                animateTruck(pathPositions);
            }
        } catch (error) {
            console.error('Error fetching optimal route:', error);
        }
    };

    const animateTruck = (path) => {
        if (!path || !path.length) return;
        let step = 0;
        const numSteps = path.length;

        if (truckMarkerRef.current) {
            clearInterval(truckMarkerRef.current);
        }

        setTruckPosition(path[0]);

        truckMarkerRef.current = setInterval(() => {
            if (step < numSteps) {
                setTruckPosition(path[step]);
                step++;
            } else {
                clearInterval(truckMarkerRef.current);
                setTruckPosition(path[0]);
            }
        }, 1000);
    };

    const pathOptions = {
        color: '#22c55e',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
        lineCap: 'round',
        lineJoin: 'round'
    };

    const connectingLineOptions = {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.6
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Route Optimization</h2>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm text-gray-600">Full</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <span className="text-sm text-gray-600">Partially Full</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-600">Empty</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={fetchOptimalRoute}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Calculate Optimal Route
                </button>

                <div className="h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <MapContainer
                        center={[center.lat, center.lng]}
                        zoom={13}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {binPositions.length > 1 && (
                            <Polyline 
                                positions={binPositions}
                                pathOptions={connectingLineOptions}
                            />
                        )}
                        {Array.isArray(bins) && bins.map((bin, index) => (
                            <Marker
                                key={bin.id || index}
                                position={[
                                    parseFloat(bin.lat) || center.lat,
                                    parseFloat(bin.lng) || center.lng
                                ]}
                                icon={getBinIcon(bin.status)}
                            >
                                <Popup className="rounded-lg shadow-lg">
                                    <div className="p-2">
                                        <p className="font-semibold text-gray-700">Status: {bin.status}</p>
                                        <p className="text-sm text-gray-600">Location: {bin.lat}, {bin.lng}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        {optimalPath?.coordinates?.length > 0 && (
                            <Polyline
                                positions={optimalPath.coordinates.map(coord => [
                                    parseFloat(coord.lat),
                                    parseFloat(coord.lng)
                                ])}
                                pathOptions={pathOptions}
                            />
                        )}
                        {truckPosition && (
                            <Marker
                                position={truckPosition}
                                icon={truckIcon}
                            >
                                <Popup className="rounded-lg shadow-lg">
                                    <div className="p-2">
                                        <p className="font-semibold text-gray-700">Collection Vehicle</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default RouteGreedy;