'use client';

import React, { useState } from 'react';


export default function TrackOrder() {
    const [trackingId, setTrackingId] = useState('');

    const handleTrack = (e) => {
        e.preventDefault();
        console.log('Tracking order:', trackingId);
    };

    return (
        <>

            <main className="min-h-screen py-24 px-5 bg-gray-50/30">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                        <h1 className="text-5xl font-black text-secondary uppercase tracking-tighter mb-4 leading-none">Track Your Shipment</h1>
                        <p className="text-gray-500 font-medium max-w-md mx-auto">Enter your tracking number below to see real-time updates of your package.</p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-black/5 p-12 relative overflow-hidden animate-in zoom-in-95 duration-500">
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <form onSubmit={handleTrack} className="space-y-8 relative z-10">
                            <div>
                                <label className="block text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4 px-1">Tracking Number / Order ID</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={trackingId}
                                        onChange={(e) => setTrackingId(e.target.value)}
                                        placeholder="e.g. ZAP-123-456"
                                        className="w-full h-16 px-8 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-secondary font-bold placeholder-gray-300"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary font-black text-xl">#</div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-lime-400 transition transform active:scale-[0.98] text-sm"
                            >
                                Track Now
                            </button>
                        </form>

                        <div className="mt-12 pt-10 border-t border-gray-50 z-10 relative">
                            <div className="flex items-start gap-5 text-gray-400 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/50">
                                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                                    📦
                                </div>
                                <p className="text-[11px] font-bold leading-relaxed uppercase tracking-wider">
                                    Need help finding your order ID? Check your confirmation email or log in to your dashboard to view your shipment history.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-3 gap-6 animate-in fade-in duration-1000 delay-300">
                        {[
                            { icon: '🚐', label: 'Processing' },
                            { icon: '📍', label: 'In Transit' },
                            { icon: '✅', label: 'Delivered' }
                        ].map((step, i) => (
                            <div key={i} className="text-center space-y-3 opacity-30 grayscale cursor-not-allowed group">
                                <div className="text-3xl transition-transform group-hover:scale-110">{step.icon}</div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em]">{step.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </>
    );
}
