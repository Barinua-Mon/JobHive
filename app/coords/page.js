"use client";
import { useState, useEffect } from "react";

export default function GeoExample() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Geolocation is not supported");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">My Location</h1>
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
