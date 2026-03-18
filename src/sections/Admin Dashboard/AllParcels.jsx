'use client';

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  Search,
  Filter,
  Eye,
} from "lucide-react";

const parcelStats = [
  {
    title: "Total Parcels",
    value: "1,248",
    subtitle: "All parcel records",
    icon: Package,
    cardStyle: "bg-blue-50 border-blue-100",
    iconStyle: "bg-blue-100 text-blue-700",
    textStyle: "text-blue-950",
  },
  {
    title: "In Transit",
    value: "328",
    subtitle: "Currently on the way",
    icon: Truck,
    cardStyle: "bg-orange-50 border-orange-100",
    iconStyle: "bg-orange-100 text-orange-700",
    textStyle: "text-orange-950",
  },
  {
    title: "Delivered",
    value: "790",
    subtitle: "Successfully completed",
    icon: CheckCircle2,
    cardStyle: "bg-emerald-50 border-emerald-100",
    iconStyle: "bg-emerald-100 text-emerald-700",
    textStyle: "text-emerald-950",
  },
  {
    title: "Pending",
    value: "130",
    subtitle: "Waiting for processing",
    icon: Clock3,
    cardStyle: "bg-violet-50 border-violet-100",
    iconStyle: "bg-violet-100 text-violet-700",
    textStyle: "text-violet-950",
  },
];

const parcels = [
  {
    id: "PCL-1024",
    sender: "John Doe",
    receiver: "Sarah Khan",
    type: "Document",
    status: "pending",
    location: "Dhaka",
    date: "18 Mar 2026",
  },
  {
    id: "PCL-1025",
    sender: "Arian Smith",
    receiver: "Nayeem Hasan",
    type: "Electronics",
    status: "in transit",
    location: "Chattogram",
    date: "18 Mar 2026",
  },
  {
    id: "PCL-1026",
    sender: "Mahin Roy",
    receiver: "Jannat Akter",
    type: "Gift Box",
    status: "delivered",
    location: "Khulna",
    date: "17 Mar 2026",
  },
  {
    id: "PCL-1027",
    sender: "Rafi Ahmed",
    receiver: "Mim Akter",
    type: "Clothing",
    status: "cancelled",
    location: "Rajshahi",
    date: "17 Mar 2026",
  },
  {
    id: "PCL-1028",
    sender: "Tanvir Hasan",
    receiver: "Nusrat Jahan",
    type: "Food Package",
    status: "in transit",
    location: "Sylhet",
    date: "16 Mar 2026",
  },
];

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "in transit":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    case "delivered":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};

export default function AllParcels() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                All Parcels
              </h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Monitor parcel activity, shipment status, and delivery progress.
              </p>
            </div>

            <button className="w-fit rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Export Parcels
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {parcelStats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-6 shadow-sm ${item.cardStyle}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-gray-600">
                        {item.title}
                      </p>
                      <h3 className={`mt-3 text-3xl font-extrabold ${item.textStyle}`}>
                        {item.value}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
                    </div>

                    <div className={`rounded-xl p-3 ${item.iconStyle}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Parcel Records</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Browse and manage all parcel entries from the dashboard.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search parcel..."
                    className="bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>

                <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">Parcel ID</th>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Receiver</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {parcels.map((parcel) => (
                    <tr
                      key={parcel.id}
                      className="transition hover:bg-gray-50/80"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {parcel.id}
                      </td>
                      <td className="px-6 py-4">{parcel.sender}</td>
                      <td className="px-6 py-4">{parcel.receiver}</td>
                      <td className="px-6 py-4">{parcel.type}</td>
                      <td className="px-6 py-4">{parcel.location}</td>
                      <td className="px-6 py-4">{parcel.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                            parcel.status
                          )}`}
                        >
                          {parcel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/15">
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}