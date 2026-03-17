'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CiSearch } from 'react-icons/ci';
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const stats = [
  { value: '64', label: 'Districts' },
  { value: '500+', label: 'Coverage Areas' },
  { value: '48h', label: 'Max Delivery' },
];

const Coverage = () => {
  const position = [23.685, 90.3563];
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [resultCount, setResultCount] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    fetch('/warehoses.json')
      .then(res => res.json())
      .then(data => {
        setWarehouses(data);
        setFilteredWarehouses(data);
      })
      .catch(err => console.error('Failed to load warehouses:', err));
  }, []);

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
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredWarehouses(warehouses);
      setResultCount(null);
    } else {
      const filtered = warehouses.filter(w =>
        w.district.toLowerCase().includes(term)
      );
      setFilteredWarehouses(filtered);
      setResultCount(filtered.length);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredWarehouses(warehouses);
    setResultCount(null);
  };

  if (!isMounted) {
    return (
      <div className="px-4 sm:px-8 lg:px-12 my-16 sm:my-20 lg:my-24">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm animate-pulse">
          <div className="h-8 bg-gray-100 rounded-full w-1/2 mb-6" />
          <div className="h-12 bg-gray-100 rounded-full w-full mb-10" />
          <div className="h-[500px] bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 sm:py-14 space-y-6 sm:space-y-8">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

        {/* ── Header ── */}
        <div className="px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-8 sm:pb-10">

          {/* Eyebrow + heading */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Delivery Coverage
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary leading-snug">
                We Deliver Across{' '}
                <span className="text-primary">All 64 Districts</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-2 max-w-lg">
                Search your district to confirm coverage and find your nearest
                ZapShift warehouse or delivery hub.
              </p>
            </div>

            {/* Inline stats */}
            <div className="flex gap-5 sm:gap-6 shrink-0">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl sm:text-2xl font-extrabold text-secondary leading-none mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
              <input
                type="text"
                placeholder="Search by district name…"
                className="w-full bg-gray-50 border border-gray-200 py-3 pl-11 pr-10 rounded-full
                           text-sm sm:text-base text-gray-700 placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400
                             hover:text-gray-600 text-sm font-bold transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary text-black font-semibold text-sm sm:text-base
                         py-3 px-7 sm:px-8 rounded-full shadow
                         hover:brightness-105 active:scale-95 transition-all duration-200"
            >
              Search
            </button>
          </div>

          {/* Search result feedback */}
          {resultCount !== null && (
            <p className="mt-3 text-sm text-gray-500 flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-primary text-xs" />
              {resultCount > 0
                ? <><span className="font-semibold text-secondary">{resultCount}</span> district{resultCount !== 1 ? 's' : ''} found</>
                : <span className="text-red-400 font-medium">No districts found — try a different name</span>
              }
            </p>
          )}
        </div>

        {/* ── Map ── */}
        <div className="px-6 sm:px-10 lg:px-14 pb-10 sm:pb-14">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[580px] w-full
                          rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

            {/* Map label badge */}
            <div className="absolute top-4 left-4 z-[999] bg-secondary text-white
                            text-xs font-semibold uppercase tracking-widest
                            px-3 py-1.5 rounded-full shadow-md pointer-events-none">
              🗺 Bangladesh Coverage
            </div>

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
              {filteredWarehouses.map(warehouse => (
                <Marker
                  key={warehouse.district}
                  position={[parseFloat(warehouse.latitude), parseFloat(warehouse.longitude)]}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold text-secondary mb-0.5">{warehouse.district}</p>
                      <p className="text-gray-500">{warehouse.covered_area}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-xs sm:text-sm text-gray-400 text-center">
            Coverage expanding regularly — new districts added every month.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Coverage;