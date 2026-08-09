'use client';

import { useState } from 'react';
import axios from 'axios';
import { Loader2, Clock, CheckCircle, Package } from 'lucide-react';

const parcelTypes = [
  { value: 'document',        label: 'Document' },
  { value: 'small-package',   label: 'Small Package' },
  { value: 'medium-package',  label: 'Medium Package' },
  { value: 'large-package',   label: 'Large Package' },
];

const destinations = [
  { value: 'inside-city',  label: 'Inside City' },
  { value: 'outside-city', label: 'Outside City' },
  { value: 'suburban',     label: 'Suburban Area' },
];

const infoCards = [
  { value: '৳50', label: 'Starting from', sub: 'inside city' },
  { value: 'Free', label: 'Pickup', sub: 'from your door' },
  { value: '0%', label: 'Hidden Fees', sub: 'transparent pricing' },
];

const Pricing = () => {
  const [parcelType, setParcelType]   = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight]           = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [pricingResult, setPricingResult] = useState(null);

  const isReady = parcelType && destination && weight && !loading;

  const handleCalculate = async () => {
    if (!isReady) return;
    setLoading(true);
    setError(null);
    setPricingResult(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/infra/pricing/calculate`,
        { parcelType, destination, weight: parseFloat(weight) }
      );
      if (response.data.success) {
        setPricingResult(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setParcelType('');
    setDestination('');
    setWeight('');
    setPricingResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

        {/* ── Header Band ── */}
        <div className="bg-secondary px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                Transparent Pricing
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-3">
                Know Your Cost{' '}
                <span className="text-primary">Before You Ship</span>
              </h1>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                No surprises, no hidden charges. Enter your parcel details and
                get an instant delivery cost estimate in seconds.
              </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 sm:flex gap-2 sm:gap-4 w-full lg:w-auto shrink-0">
              {infoCards.map(card => (
                <div
                  key={card.label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-2.5 sm:px-5 py-2.5 sm:py-3 text-center"
                >
                  <p className="text-base sm:text-xl font-extrabold text-primary leading-none mb-0.5">
                    {card.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/60 font-medium">{card.label}</p>
                  <p className="text-[10px] sm:text-xs text-white/30 truncate">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Calculator Body ── */}
        <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* ── Form ── */}
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                Parcel Details
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-secondary mb-7">
                Calculate Your Delivery Cost
              </h2>

              <div className="space-y-5">

                {/* Parcel type */}
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    Parcel Type
                  </label>
                  <select
                    value={parcelType}
                    onChange={e => { setParcelType(e.target.value); setPricingResult(null); setError(null); }}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4
                               text-sm text-gray-700 outline-none appearance-none cursor-pointer
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                  >
                    <option value="">Select parcel type</option>
                    {parcelTypes.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    Delivery Destination
                  </label>
                  <select
                    value={destination}
                    onChange={e => { setDestination(e.target.value); setPricingResult(null); setError(null); }}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4
                               text-sm text-gray-700 outline-none appearance-none cursor-pointer
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                  >
                    <option value="">Select destination</option>
                    {destinations.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 1.5"
                    value={weight}
                    onChange={e => { setWeight(e.target.value); setPricingResult(null); setError(null); }}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4
                               text-sm text-gray-700 placeholder-gray-400 outline-none
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="text-red-600 font-bold text-sm">{error}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full border border-gray-200 text-sm font-semibold
                               text-secondary hover:border-secondary hover:bg-gray-50
                               active:scale-95 transition-all duration-200"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleCalculate}
                    disabled={!isReady}
                    className={`flex-1 py-3 rounded-full text-sm font-semibold shadow
                                active:scale-95 transition-all duration-200 flex items-center justify-center gap-2
                                ${isReady
                        ? 'bg-primary text-black hover:brightness-105 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin w-4 h-4" /> Calculating…</>
                    ) : (
                      'Calculate Cost'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Result Panel ── */}
            <div className={`rounded-2xl border transition-all duration-300
                            ${pricingResult
                ? 'bg-primary/5 border-primary/20'
                : 'bg-gray-50 border-gray-100'
              } p-6 sm:p-8`}>

              {/* Loading skeleton */}
              {loading && (
                <div className="space-y-4 animate-pulse py-4">
                  <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-6" />
                  <div className="h-16 bg-gray-200 rounded-2xl w-2/3" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-8" />
                  <div className="space-y-3 mt-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex justify-between bg-white rounded-xl px-4 py-3 border border-gray-100">
                        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                        <div className="h-3 bg-gray-200 rounded-full w-1/4" />
                      </div>
                    ))}
                    <div className="bg-gray-200 rounded-xl px-4 py-3 h-11" />
                  </div>
                </div>
              )}

              {/* Empty placeholder */}
              {!loading && !pricingResult && (
                <div className="flex flex-col items-center justify-center text-center py-10 sm:py-14">
                  <div className="text-gray-300 mb-4 flex justify-center">
                    <Package className="w-16 h-16" strokeWidth={1} />
                  </div>
                  <p className="text-secondary font-semibold text-base sm:text-lg mb-1">
                    Your estimate will appear here
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Fill in the parcel details on the left and hit
                    <span className="text-secondary font-medium"> Calculate Cost</span>.
                  </p>
                </div>
              )}

              {/* Result breakdown */}
              {!loading && pricingResult && (
                <div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                    Estimated Cost
                  </p>
                  <p className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-secondary leading-none mb-2">
                    ৳{pricingResult.totalCost}
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    All charges included · No hidden fees
                  </p>

                  {/* Breakdown rows */}
                  <div className="space-y-3">
                    {[
                      { label: 'Base Fare', value: pricingResult.baseFare },
                      { label: 'Weight Charge', value: pricingResult.weightCharge },
                      { label: 'Destination Surcharge', value: pricingResult.destinationCharge },
                    ].map(item => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between bg-white rounded-xl
                                   px-4 py-3 border border-gray-100"
                      >
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="text-sm font-bold text-secondary">৳{item.value}</span>
                      </div>
                    ))}

                    {/* Total row */}
                    <div className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3 mt-1">
                      <span className="text-sm font-semibold text-white">Total Payable</span>
                      <span className="text-base font-extrabold text-primary">
                        ৳{pricingResult.totalCost}
                      </span>
                    </div>
                  </div>

                  {/* Delivery window */}
                  <div className="flex items-center gap-3 mt-6 bg-white rounded-xl px-4 py-3 border border-gray-100">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estimated Delivery</p>
                      <p className="text-sm font-extrabold text-secondary">{pricingResult.estimatedDays}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />
                  </div>

                  <p className="text-xs text-gray-400 mt-5 leading-relaxed">
                    * This is an estimate. Final charges may vary based on actual
                    weight and delivery conditions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Pricing;