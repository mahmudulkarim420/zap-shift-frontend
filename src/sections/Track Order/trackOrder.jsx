'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner, FaCheckCircle, FaMapMarkerAlt, FaClock, FaBox, FaShuttleVan, FaTruck, FaStar } from 'react-icons/fa';

const STATUS_MAP = {
  pending:          { label: "Pending",          icon: <FaClock />, color: "text-amber-500" },
  accepted:         { label: "Accepted",         icon: <FaCheckCircle />, color: "text-blue-500" },
  in_transit:       { label: "In Transit",       icon: <FaShuttleVan />, color: "text-purple-500" },
  out_for_delivery: { label: "Out for Delivery", icon: <FaTruck />, color: "text-orange-500" },
  delivered:        { label: "Delivered",        icon: <FaStar />, color: "text-green-500" },
};

export default function TrackOrder({ initialId = "" }) {
  const [id, setId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/parcels/track/${id}`);
      if (res.data.success) {
        setResult(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Tracking ID. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-track if initialId is provided
  useEffect(() => {
    if (initialId) {
      setId(initialId);
      handleTrack();
    }
  }, [initialId]);

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Search Input */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 p-8 mb-10">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Tracking ID (e.g. ZS-123456)"
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-secondary uppercase placeholder:normal-case placeholder:font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !id}
            className="h-14 px-10 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Track"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-xs font-bold px-1 uppercase tracking-widest">{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Main Info Card */}
          <div className="bg-secondary rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Live Status</p>
                <h2 className="text-3xl font-black mb-1 capitalize">{(STATUS_MAP[result.parcel.status]?.label || result.parcel.status).replace('_', ' ')}</h2>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Tracking ID: {result.parcel.trackingId}</p>
              </div>
              <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-0 border-white/5 pt-6 sm:pt-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Destination</p>
                <p className="text-xl font-bold">{result.parcel.receiver?.district || "N/A"}</p>
                <p className="text-white/40 text-xs mt-1">{result.parcel.receiver?.address}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10">
            <h3 className="text-lg font-black text-secondary uppercase tracking-widest mb-10 flex items-center gap-3">
              <FaClock className="text-primary" /> Delivery Journey
            </h3>
            
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {result.trackingHistory.map((event, i) => (
                <div key={i} className="relative pl-10">
                  {/* Point */}
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${i === 0 ? 'bg-primary' : 'bg-gray-200'}`}>
                    {i === 0 && <div className="w-2 h-2 bg-black rounded-full animate-ping" />}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className={`text-sm font-black uppercase tracking-widest ${i === 0 ? 'text-secondary' : 'text-gray-400'}`}>
                        {event.status.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-1">{event.note}</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parcel Specs */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Parcel Type", value: result.parcel.type, icon: <FaBox className="text-primary" /> },
              { label: "Weight", value: `${result.parcel.weight} KG`, icon: <FaMapMarkerAlt className="text-primary" /> },
              { label: "Charges", value: `৳${result.parcel.deliveryCharge}`, icon: <FaCheckCircle className="text-primary" /> },
            ].map(spec => (
              <div key={spec.label} className="bg-gray-50 border border-gray-100 rounded-3xl p-6 hover:bg-white transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  {spec.icon}
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{spec.label}</p>
                </div>
                <p className="text-lg font-black text-secondary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State / Initial View */}
      {!result && !loading && !error && (
        <div className="text-center py-10 opacity-50">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Awaiting Tracking Input</p>
        </div>
      )}
    </div>
  );
}
