'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function MapFix({ setMapLoaded }) {
    const map = useMap();
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
            setMapLoaded(true);
        }, 200);
        return () => clearTimeout(timer);
    }, [map, setMapLoaded]);
    return null;
}

const userIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
const jobIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconSize: [35, 56],
    iconAnchor: [17, 56],
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
};

export default function MapClient({ center = [9.072264, 7.491302], zoom = 5, jobTitle = 'Job Location' }) {
    const [userLocation, setUserLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [geoLoading, setGeoLoading] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setUserLocation([latitude, longitude]);
                    setDistance(calculateDistance(latitude, longitude, center[1], center[0]));
                    setGeoLoading(false);
                },
                (err) => {
                    console.error("Geolocation error:", err?.message || err);
                    const errorMessage =
                        err.code === 1
                            ? "Location permission denied. Please allow location access."
                            : err.code === 2
                                ? "Location unavailable. Please check your connection."
                                : err.code === 3
                                    ? "Location request timed out. Try again."
                                    : "Unable to access your location.";
                    setError(errorMessage);
                    setGeoLoading(false);
                }

            );
        } else {
            setError('Geolocation not supported.');
            setGeoLoading(false);
        }
    }, [center]);

    const polylinePositions = userLocation ? [userLocation, [center[1], center[0]]] : [];

    return (
        <div className="relative">
            {(!mapLoaded || geoLoading) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-2xl z-[1000]">
                    <div className="bg-white p-4 rounded-lg shadow-md text-gray-800">Loading...</div>
                </div>
            )}
            {error && (
                <div className="absolute top-4 left-4 bg-red-100 p-3 rounded-lg shadow-md text-red-800 z-[1000]">
                    {error}
                </div>
            )}
            <MapContainer
                center={[center[1], center[0]]}
                zoom={zoom}
                scrollWheelZoom={false}
                className="w-full h-[400px] rounded-2xl shadow-lg border border-gray-200 z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[center[1], center[0]]} icon={jobIcon}>
                    <Popup>{jobTitle}</Popup>
                </Marker>
                {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>
                            Your Location
                            {distance && <div>Distance: {distance} km</div>}
                        </Popup>
                    </Marker>
                )}
                {polylinePositions.length > 0 && (
                    <Polyline positions={polylinePositions} color="blue" weight={4} opacity={0.7} />
                )}
                <MapFix setMapLoaded={setMapLoaded} />
            </MapContainer>
            {distance && mapLoaded && (
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md text-gray-800 z-[1000]">
                   📍 Distance to {jobTitle}: {distance} km
                </div>
            )}
        </div>
    );
}
