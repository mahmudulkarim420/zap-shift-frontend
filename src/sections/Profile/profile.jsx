"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { normalizeRole } from "@/utils/roleUtils";
import axios from "axios";
import {
  FaCamera, FaSpinner, FaCheckCircle, FaUser,
  FaEnvelope, FaPhone, FaShieldAlt, FaChartPie, FaSignOutAlt
} from "react-icons/fa";

const roleConfig = {
  admin: {
    label: "Root Administrator",
    badgeClass: "bg-primary/15 text-secondary border-primary/30",
    headerClass: "bg-secondary",
    accentClass: "bg-primary/5 border-primary/20",
    accentText: "text-primary",
    access: "Full system access — manage users, riders, parcels and platform settings.",
  },
  rider: {
    label: "Active Rider",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    headerClass: "bg-secondary",
    accentClass: "bg-blue-50 border-blue-100",
    accentText: "text-blue-600",
    access: "View your delivery queue, update delivery status, and track your daily earnings.",
  },
  user: {
    label: "Standard User",
    badgeClass: "bg-gray-100 text-secondary border-gray-200",
    headerClass: "bg-secondary",
    accentClass: "bg-gray-50 border-gray-100",
    accentText: "text-secondary",
    access: "Track parcels, manage shipments, and view your delivery history.",
  },
};

const riderStats = [
  { label: "Deliveries", value: "142" },
  { label: "Avg. Rating", value: "4.9★" },
  { label: "Rank", value: "Gold" },
];

export default function DynamicProfile() {
  const { data: session, status, update } = useSession();
  const isLoading = status === "loading";
  const fileInputRef = useRef(null);

  // Editable local state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Seed local state from session once loaded
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhone(session.user.phone || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const normalizedUserRole = normalizeRole(session?.user?.role);
  const role = roleConfig[normalizedUserRole] ?? roleConfig.user;
  const initial = (name || session?.user?.email || "U").charAt(0).toUpperCase();

  /* ── Image upload ── */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBBB_API_KEY}`,
        formData
      );
      if (res.data?.success) {
        setImage(res.data.data.display_url);
      } else {
        setErrorMsg("Image upload failed. Please try again.");
      }
    } catch {
      setErrorMsg("Error uploading image to ImgBB.");
    } finally {
      setIsUploading(false);
    }
  };

  /* ── Save changes ── */
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-profile`,
        { name, phone, image },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      if (res.data?.success) {
        // Update the Next-Auth session without a hard reload
        await update({ name, image, phone });
        setSuccessMsg("Profile updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(res.data?.message || "Update failed.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Loading / Unauthenticated guards ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-bold">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <div className="w-full mx-auto">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          {/* ── Header Band ── */}
          <div className={`${role.headerClass} px-6 sm:px-10 lg:px-14 py-10 sm:py-12 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_60%)] pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Clickable avatar */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/20 border-2 border-primary/40
                             flex items-center justify-center text-2xl sm:text-3xl font-black text-primary
                             shadow-lg shrink-0 overflow-hidden group cursor-pointer"
                  title="Change photo"
                >
                  {isUploading ? (
                    <FaSpinner className="animate-spin text-primary text-2xl" />
                  ) : image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    initial
                  )}
                  {!isUploading && (
                    <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <FaCamera className="text-white text-lg" />
                    </span>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Account Overview</p>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                    {name || "Your Profile"}
                  </h1>
                  <p className="text-white/50 text-xs sm:text-sm mt-1">{session.user.email}</p>
                </div>
              </div>

              <span className={`self-start sm:self-auto inline-flex items-center border px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/95 ${role.badgeClass}`}>
                {role.label}
              </span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 p-6 sm:p-8 lg:p-10">

            {/* ── Left: Edit Form ── */}
            <div className="space-y-6">
              <form onSubmit={handleSave}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Personal Info</p>
                      <h2 className="text-xl sm:text-2xl font-bold text-secondary">Edit Profile</h2>
                    </div>
                    <span className="hidden sm:inline-flex bg-primary/10 text-secondary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Secure Profile
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        <FaUser className="text-primary" /> Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50
                                   focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40
                                   text-secondary font-bold text-sm transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        <FaEnvelope className="text-primary" /> Email Address
                        <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Read-only</span>
                      </label>
                      <input
                        type="email"
                        value={session.user.email || ""}
                        disabled
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50
                                   text-gray-400 font-bold text-sm cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        <FaPhone className="text-primary" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50
                                   focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40
                                   text-secondary font-bold text-sm transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Profile Photo */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                        <FaCamera className="text-primary" /> Profile Photo
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-dashed cursor-pointer transition-all
                                   ${image ? 'border-primary/40 bg-primary/5' : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden
                                        ${image ? 'border border-primary/20' : 'bg-white border border-gray-100'}`}>
                          {isUploading ? (
                            <FaSpinner className="animate-spin text-primary" />
                          ) : image ? (
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <FaCamera className="text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-secondary">
                            {isUploading ? "Uploading..." : image ? "Photo uploaded — click to change" : "Click to upload a new photo"}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PNG, JPG up to 5MB · Hosted on ImgBB</p>
                        </div>
                        {image && !isUploading && <FaCheckCircle className="text-primary text-lg shrink-0" />}
                      </div>
                    </div>
                  </div>

                  {/* Feedback Messages */}
                  {successMsg && (
                    <div className="mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <FaCheckCircle className="text-green-500 text-lg shrink-0" />
                      <p className="text-green-700 font-bold text-sm">{successMsg}</p>
                    </div>
                  )}
                  {errorMsg && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 font-bold text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="mt-6 w-full py-4 bg-primary text-black font-extrabold rounded-2xl shadow-lg shadow-primary/20
                               hover:brightness-105 active:scale-[0.98] transition-all uppercase tracking-widest text-sm
                               disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <><FaSpinner className="animate-spin" /> Saving Changes...</>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>

              {/* Rider Stats */}
              {normalizedUserRole === "rider" && (
                <div className="bg-secondary rounded-2xl p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Rider Performance</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Delivery Insights</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {riderStats.map((stat) => (
                      <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-white/40 uppercase tracking-wide mb-2">{stat.label}</p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-primary leading-none">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Role Access */}
              <div className={`border rounded-2xl p-6 sm:p-7 ${role.accentClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${role.accentText}`}>Role Access</p>
                <h3 className="text-lg sm:text-xl font-bold text-secondary mb-3">{role.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{role.access}</p>
              </div>
            </div>

            {/* ── Right: Summary ── */}
            <div className="space-y-5">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Profile Summary</p>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-black text-secondary shrink-0 overflow-hidden border border-primary/10">
                    {image ? (
                      <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-secondary text-sm truncate">{name || "Unknown User"}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    {phone && <p className="text-xs text-gray-400 truncate mt-0.5">{phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: <FaShieldAlt />, label: "Role", value: role.label, highlight: false },
                    { icon: <FaCheckCircle />, label: "Status", value: "Active", highlight: true },
                    { icon: <FaPhone />, label: "Phone", value: phone || "Not set", highlight: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        <span className="text-primary">{row.icon}</span>{row.label}
                      </span>
                      <span className={`text-xs font-bold truncate max-w-[120px] ${row.highlight ? "text-green-600" : "text-secondary"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip Card */}
              <div className="bg-secondary rounded-2xl p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Pro Tip</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Adding a profile photo and phone number makes it easier for riders to coordinate your deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
