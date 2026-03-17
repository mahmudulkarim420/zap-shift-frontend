'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CiSearch } from 'react-icons/ci';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const Coverage = () => {
  const position = [23.685, 90.3563];
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Fetch warehouses data
    fetch('/warehoses.json') // Using the filename found in public/
      .then(res => res.json())
      .then(data => {
        setWarehouses(data);
        setFilteredWarehouses(data);
      })
      .catch(err => console.error('Failed to load warehouses:', err));
  }, []);

  // Fix for Leaflet icons in Next.js
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredWarehouses(warehouses);
    } else {
      const filtered = warehouses.filter((warehouse) =>
        warehouse.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWarehouses(filtered);
    }
  };

  if (!isMounted) return <div className="h-screen bg-white" />;

  return (
    <div className="bg-white min-h-screen rounded-xl p-10 sm:p-10 my-15">
      <div className="">
        <h2 className="font-bold text-3xl sm:text-4xl text-secondary mb-8">
          We are available in 64 districts
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 relative">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-full focus:outline-none text-gray-700 border border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl" />
          </div>

          <button
            className="bg-primary text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-lime-400 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      
      <div>
        <h1 className="font-bold text-secondary text-2xl mt-10">
          We deliver almost all over Bangladesh
        </h1>
      </div>

      <div className="h-[600px] w-full mt-10 mb-10 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredWarehouses.map((warehouse) => (
            <Marker
              position={[parseFloat(warehouse.latitude), parseFloat(warehouse.longitude)]}
              key={warehouse.id}
            >
              <Popup>
                <strong>{warehouse.district}</strong> <br />
                <span>{warehouse.covered_area}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
