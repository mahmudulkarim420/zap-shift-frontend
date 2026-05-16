"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function RiderDashboard() {
  return (
    <DashboardLayout roleName="Rider">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 shadow-sm transition hover:bg-yellow-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-yellow-800 uppercase tracking-widest mb-1">
              Pickups
            </h3>
            <p className="text-3xl font-extrabold text-yellow-900">12</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm transition hover:bg-blue-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-widest mb-1">
              Ongoing
            </h3>
            <p className="text-3xl font-extrabold text-blue-900">4</p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm transition hover:bg-green-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-green-800 uppercase tracking-widest mb-1">
              Delivered
            </h3>
            <p className="text-3xl font-extrabold text-green-900">18</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm transition hover:bg-orange-100 hover:scale-[1.02]">
            <h3 className="text-sm font-semibold text-orange-800 uppercase tracking-widest mb-1">
              Earnings
            </h3>
            <p className="text-3xl font-extrabold text-orange-900">$420</p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8 font-extrabold uppercase">
            Assigned Tasks
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 block">
                    Pending Pickup
                  </span>
                  <h4 className="text-lg font-extrabold text-gray-900">Package #2031</h4>
                </div>
                <p className="text-sm text-gray-500 font-bold">$12.50</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-sm text-gray-600 font-medium">
                    Pickup: <span className="text-gray-900 font-bold">Gulshan 1, Dhaka</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-sm text-gray-600 font-medium">
                    Drop-off: <span className="text-gray-900 font-bold">Banani, Dhaka</span>
                  </p>
                </div>
              </div>
              <button className="w-full bg-primary py-3 rounded-xl font-extrabold text-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition transform active:scale-95">
                Accept Task
              </button>
            </div>
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 block">
                    Ongoing
                  </span>
                  <h4 className="text-lg font-extrabold text-gray-900">Package #1922</h4>
                </div>
                <p className="text-sm text-gray-500 font-bold">$8.00</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-sm text-gray-600 font-medium font-medium">
                    Pickup: <span className="text-gray-900 font-bold">Dhanmondi, Dhaka</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-sm text-gray-600 font-medium">
                    Drop-off: <span className="text-gray-900 font-bold">Uttara, Dhaka</span>
                  </p>
                </div>
              </div>
              <button className="w-full bg-gray-900 py-3 rounded-xl font-extrabold text-white text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition transform active:scale-95">
                Complete Trip
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
}
