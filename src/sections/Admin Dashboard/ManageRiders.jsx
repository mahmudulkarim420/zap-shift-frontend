"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import {
  Bike,
  UserCheck,
  Clock3,
  ShieldAlert,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const riderStats = [
  {
    title: "Total Riders",
    value: "158",
    subtitle: "All rider accounts",
    icon: Bike,
    cardStyle: "bg-orange-50 border-orange-100",
    iconStyle: "bg-orange-100 text-orange-700",
    textStyle: "text-orange-950",
  },
  {
    title: "Active Riders",
    value: "124",
    subtitle: "Currently available",
    icon: UserCheck,
    cardStyle: "bg-emerald-50 border-emerald-100",
    iconStyle: "bg-emerald-100 text-emerald-700",
    textStyle: "text-emerald-950",
  },
  {
    title: "Pending Review",
    value: "21",
    subtitle: "Awaiting approval",
    icon: Clock3,
    cardStyle: "bg-amber-50 border-amber-100",
    iconStyle: "bg-amber-100 text-amber-700",
    textStyle: "text-amber-950",
  },
  {
    title: "Suspended",
    value: "13",
    subtitle: "Restricted accounts",
    icon: ShieldAlert,
    cardStyle: "bg-red-50 border-red-100",
    iconStyle: "bg-red-100 text-red-700",
    textStyle: "text-red-950",
  },
];

const riders = [
  {
    id: "RID-1001",
    name: "Nayeem Hasan",
    email: "nayeem@example.com",
    phone: "01712345678",
    zone: "Dhaka",
    status: "active",
  },
  {
    id: "RID-1002",
    name: "Sarah Khan",
    email: "sarah@example.com",
    phone: "01898765432",
    zone: "Chattogram",
    status: "pending",
  },
  {
    id: "RID-1003",
    name: "Arian Smith",
    email: "arian@example.com",
    phone: "01944556677",
    zone: "Sylhet",
    status: "active",
  },
  {
    id: "RID-1004",
    name: "Mahin Roy",
    email: "mahin@example.com",
    phone: "01622334455",
    zone: "Khulna",
    status: "suspended",
  },
  {
    id: "RID-1005",
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    phone: "01566778899",
    zone: "Rajshahi",
    status: "pending",
  },
];

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "pending":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "suspended":
      return "bg-red-100 text-red-700 border border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};

export default function ManageRiders() {
  return (
    <DashboardLayout roleName="Admin">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Manage Riders</h1>
              <p className="mt-1 text-sm md:text-base text-gray-500">
                Review rider applications, monitor active accounts, and manage rider status.
              </p>
            </div>

            <button className="w-fit rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Export Riders
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {riderStats.map((item) => {
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
                <h2 className="text-xl font-bold text-gray-900">Rider Directory</h2>
                <p className="mt-1 text-sm text-gray-500">
                  View rider information and take action on pending or suspended accounts.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search rider..."
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
                    <th className="px-6 py-4">Rider ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Zone</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {riders.map((rider) => (
                    <tr key={rider.id} className="transition hover:bg-gray-50/80">
                      <td className="px-6 py-4 font-semibold text-gray-900">{rider.id}</td>
                      <td className="px-6 py-4">{rider.name}</td>
                      <td className="px-6 py-4">{rider.email}</td>
                      <td className="px-6 py-4">{rider.phone}</td>
                      <td className="px-6 py-4">{rider.zone}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadge(
                            rider.status,
                          )}`}
                        >
                          {rider.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/15">
                            <Eye className="h-4 w-4" />
                            View
                          </button>

                          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200">
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>

                          <button className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200">
                            <XCircle className="h-4 w-4" />
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
}
