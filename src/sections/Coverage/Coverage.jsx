'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { FaMapMarkerAlt, FaWarehouse, FaCheckCircle, FaGlobe } from 'react-icons/fa';
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
  const position = [23.685, 90.3563]; // Bangladesh Center
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/infra/warehouses`);
        if (response.data.success) {
          setWarehouses(response.data.data);
        }
      } catch (err) {
        console.error('Failed to load warehouses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouses();
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

  const filteredWarehouses = warehouses.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl animate-pulse">
      <div className="h-6 bg-white/20 rounded-full w-2/3 mb-4" />
      <div className="h-4 bg-white/10 rounded-full w-full mb-2" />
      <div className="h-4 bg-white/10 rounded-full w-1/2 mb-6" />
      <div className="flex gap-2">
        <div className="h-8 bg-white/20 rounded-full w-24" />
        <div className="h-8 bg-white/20 rounded-full w-24" />
      </div>
    </div>
  );

  if (!isMounted) return null;

  return (
    <section className="py-10 sm:py-20 relative overflow-hidden">
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Header ── */}
        <div className="text-center mb-12 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Nationwide Logistics
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-secondary leading-tight">
            Our Growing <span className="text-primary">Coverage Network</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            ZapShift operates advanced fulfillment centers across Bangladesh. Use the search or map below to find your nearest hub.
          </p>
          
          <div className="flex justify-center gap-8 mt-10">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-secondary leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search & Filters ── */}
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
          <div className="relative group">
            <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by hub name or district..."
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 py-4 pl-14 pr-6 rounded-2xl
                         text-base text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                         transition-all duration-300"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ── Warehouse Grid ── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
              <FaWarehouse className="text-primary" /> Active Warehouses
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
              {filteredWarehouses.length} Hubs Found
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredWarehouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredWarehouses.map(warehouse => (
                <div 
                  key={warehouse._id}
                  className="group bg-white/40 backdrop-blur-md border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 
                             hover:scale-[1.02] hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FaWarehouse size={80} />
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      <FaCheckCircle /> Fully Operational
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">
                    {warehouse.name}
                  </h4>
                  <p className="text-gray-500 text-sm font-medium mb-6">
                    {warehouse.address}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-primary shrink-0" />
                      <span className="font-bold">{warehouse.district} District</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {warehouse.coveredAreas?.slice(0, 3).map(area => (
                        <span key={area} className="text-[10px] font-bold text-secondary bg-gray-100 px-2 py-1 rounded-lg">
                          {area}
                        </span>
                      ))}
                      {warehouse.coveredAreas?.length > 3 && (
                        <span className="text-[10px] font-bold text-gray-400 px-2 py-1">
                          +{warehouse.coveredAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-3xl p-16 text-center">
              <div className="text-5xl mb-4 text-gray-200">📍</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No hubs found in this location</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-primary font-bold text-sm hover:underline">Clear Search</button>
            </div>
          )}
        </div>

        {/* ── Visual Map ── */}
        <div className="bg-secondary rounded-[3rem] p-4 sm:p-6 lg:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-6 left-6 z-[999] bg-primary text-secondary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
            <FaGlobe className="animate-spin-slow" /> Real-time Presence
          </div>
          
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden">
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
                  key={warehouse._id}
                  position={
                    // Fallback coordinates if model doesn't have them yet
                    warehouse.district === "Dhaka" ? [23.8103, 90.4125] :
                    warehouse.district === "Chittagong" ? [22.3569, 91.7832] :
                    warehouse.district === "Sylhet" ? [24.8949, 91.8687] :
                    [23.685, 90.3563]
                  }
                >
                  <Popup>
                    <div className="p-2">
                      <p className="font-black text-secondary text-sm">{warehouse.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{warehouse.address}</p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600 font-bold">
                        <FaCheckCircle /> Active Hub
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <p className="mt-10 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
          ZapShift Logistics Network · Nationwide Delivery in 24-48 Hours
        </p>
      </div>
    </section>
  );
};

export default Coverage;