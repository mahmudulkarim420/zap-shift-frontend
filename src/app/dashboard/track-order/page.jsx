"use client";

import { Suspense } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import TrackOrder from "@/sections/Track Order/trackOrder";
import { useSearchParams } from "next/navigation";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const trackingIdFromQuery = searchParams.get("id");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Live Tracker</p>
        <h1 className="text-2xl font-extrabold text-secondary">Track Your Shipment</h1>
        <p className="text-sm text-gray-400 mt-1">Monitor your package movement in real-time.</p>
      </div>

      {/* Reusing the TrackOrder component, but it might need adaptation for dashboard styling */}
      {/* For now, we wrap it in the dashboard layout */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-10">
        <TrackOrder initialId={trackingIdFromQuery} />
      </div>
    </div>
  );
}

export default function DashboardTrackOrder() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-10">Loading tracker…</div>}>
        <TrackOrderContent />
      </Suspense>
    </DashboardLayout>
  );
}
