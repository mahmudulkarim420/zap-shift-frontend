"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import {
  FaBoxOpen, FaUser, FaPhone, FaMapMarkerAlt,
  FaWeightHanging, FaCheckCircle, FaSpinner, FaTimes
} from "react-icons/fa";

const PARCEL_TYPES = [
  { value: "document",        label: "Document",        baseFare: 50 },
  { value: "small-package",   label: "Small Package",   baseFare: 80 },
  { value: "medium-package",  label: "Medium Package",  baseFare: 120 },
  { value: "large-package",   label: "Large Package",   baseFare: 180 },
  { value: "fragile",         label: "Fragile",         baseFare: 100 },
];

const DESTINATIONS = [
  { value: "inside-city",  label: "Inside City",   surcharge: 0  },
  { value: "outside-city", label: "Outside City",  surcharge: 50 },
  { value: "suburban",     label: "Suburban Area", surcharge: 80 },
];

const calcCost = (parcelType, destination, weight) => {
  const pt   = PARCEL_TYPES.find(p => p.value === parcelType);
  const dest = DESTINATIONS.find(d => d.value === destination);
  const kg   = parseFloat(weight) || 0;
  if (!pt || !dest || kg <= 0) return null;

  const baseFare      = pt.baseFare;
  const destCharge    = dest.surcharge;
  const weightCharge  = Math.ceil(Math.max(0, kg - 1)) * 20;
  return { baseFare, destCharge, weightCharge, total: baseFare + destCharge + weightCharge };
};

const EMPTY = { receiverName: "", receiverPhone: "", deliveryAddress: "", district: "", parcelType: "", destination: "", weight: "", instructions: "" };

export default function BookParcel() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm]           = useState(EMPTY);
  const [estimate, setEstimate]   = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(null); // { trackingId, totalCost }

  // Live cost estimate
  useEffect(() => {
    setEstimate(calcCost(form.parcelType, form.destination, form.weight));
  }, [form.parcelType, form.destination, form.weight]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError(null);
  };

  const canSubmit = form.receiverName && form.receiverPhone && form.deliveryAddress &&
                    form.parcelType && form.destination && form.weight && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/parcels/book`,
        { ...form, weight: parseFloat(form.weight) },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      if (res.data.success) {
        setSuccess(res.data.data);
        setForm(EMPTY);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setForm(EMPTY); setEstimate(null); setError(null); };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">

        {/* Header */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Parcel Booking</p>
          <h1 className="text-2xl font-extrabold text-secondary">Book a New Delivery</h1>
          <p className="text-sm text-gray-400 mt-1">Fill in the receiver details and we'll handle the rest.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-5">

            {/* Receiver */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-4">Receiver Details</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <FaUser className="text-primary" /> Full Name
                  </label>
                  <input
                    name="receiverName" value={form.receiverName} onChange={handleChange} required
                    placeholder="Receiver's full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                               focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <FaPhone className="text-primary" /> Phone
                  </label>
                  <input
                    name="receiverPhone" value={form.receiverPhone} onChange={handleChange} required type="tel"
                    placeholder="+880 1X XX XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                               focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                <FaMapMarkerAlt className="text-primary" /> Delivery Address
              </label>
              <textarea
                name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} required rows={2}
                placeholder="House no., road, area…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold resize-none
                           focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
              <input
                name="district" value={form.district} onChange={handleChange}
                placeholder="District (optional)"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                           focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Parcel Details */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-4">Parcel Details</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <FaBoxOpen className="text-primary" /> Parcel Type
                  </label>
                  <select
                    name="parcelType" value={form.parcelType} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                               focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select type</option>
                    {PARCEL_TYPES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <FaMapMarkerAlt className="text-primary" /> Destination
                  </label>
                  <select
                    name="destination" value={form.destination} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                               focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select zone</option>
                    {DESTINATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <FaWeightHanging className="text-primary" /> Weight (KG)
                  </label>
                  <input
                    name="weight" value={form.weight} onChange={handleChange} required type="number" min="0.1" step="0.1"
                    placeholder="e.g. 1.5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold
                               focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                Special Instructions <span className="text-gray-300 normal-case font-normal">(optional)</span>
              </label>
              <textarea
                name="instructions" value={form.instructions} onChange={handleChange} rows={2}
                placeholder="e.g. Fragile — handle with care, call before delivery…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-secondary font-bold resize-none
                           focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <FaTimes className="text-red-400 shrink-0" />
                <p className="text-red-600 text-sm font-bold">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={handleReset}
                className="px-6 py-3 rounded-full border border-gray-200 text-sm font-bold text-secondary
                           hover:border-secondary hover:bg-gray-50 active:scale-95 transition-all">
                Reset
              </button>
              <button type="submit" disabled={!canSubmit}
                className={`flex-1 py-3 rounded-full text-sm font-extrabold shadow flex items-center justify-center gap-2
                            active:scale-95 transition-all uppercase tracking-widest
                            ${canSubmit ? "bg-primary text-black hover:brightness-105 cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                {loading ? <><FaSpinner className="animate-spin" /> Processing…</> : "Confirm Booking"}
              </button>
            </div>
          </form>

          {/* ── Cost Estimate Sidebar ── */}
          <div className="space-y-4">
            <div className={`rounded-2xl border p-6 transition-all duration-300 ${estimate ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-100"}`}>
              {!estimate ? (
                <div className="flex flex-col items-center text-center py-8">
                  <span className="text-4xl mb-3">💰</span>
                  <p className="text-secondary font-bold text-sm">Live cost estimate</p>
                  <p className="text-gray-400 text-xs mt-1">Select type, zone, and weight to see pricing.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Live Estimate</p>
                  <p className="text-5xl font-extrabold text-secondary leading-none mb-1">৳{estimate.total}</p>
                  <p className="text-xs text-gray-400 mb-5">All charges included</p>
                  <div className="space-y-2">
                    {[
                      { label: "Base Fare",     value: estimate.baseFare },
                      { label: "Weight Charge", value: estimate.weightCharge },
                      { label: "Dest. Surcharge", value: estimate.destCharge },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between bg-white rounded-xl px-4 py-2.5 border border-gray-100">
                        <span className="text-xs text-gray-500">{r.label}</span>
                        <span className="text-xs font-bold text-secondary">৳{r.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between bg-secondary rounded-xl px-4 py-2.5">
                      <span className="text-xs font-bold text-white">Total</span>
                      <span className="text-xs font-extrabold text-primary">৳{estimate.total}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">* Final cost confirmed by server upon booking.</p>
                </>
              )}
            </div>

            {/* Guide card */}
            <div className="bg-secondary rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">How It Works</p>
              {["Fill receiver details", "Select parcel type & weight", "Confirm booking", "Rider picks it up"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0">{i + 1}</span>
                  <p className="text-white/60 text-xs font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Success Modal ── */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Booking Confirmed!</p>
            <h3 className="text-2xl font-extrabold text-secondary mb-1">Parcel Booked</h3>
            <p className="text-gray-400 text-sm mb-5">Your parcel is now pending pickup.</p>

            <div className="bg-gray-50 rounded-2xl px-5 py-4 mb-6">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Tracking ID</p>
              <p className="text-xl font-extrabold text-secondary tracking-widest">{success.trackingId}</p>
              <p className="text-xs text-primary font-bold mt-1">৳{success.totalCost} Total</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSuccess(null)}
                className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-bold text-secondary hover:bg-gray-50 transition active:scale-95">
                Book Another
              </button>
              <button onClick={() => { setSuccess(null); router.push("/dashboard/my-orders"); }}
                className="flex-1 py-3 rounded-full bg-primary text-black text-sm font-extrabold hover:brightness-105 transition active:scale-95">
                My Orders →
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
