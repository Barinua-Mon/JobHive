'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Map component so it only runs on the client
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-gray-200 rounded-2xl">
      <p className="text-gray-700">Loading map...</p>
    </div>
  ),
});

export default function Map(props) {
  return <MapClient {...props} />;
}
