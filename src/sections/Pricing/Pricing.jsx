'use client';

import { useState } from 'react';

const parcelTypes = [
  { value: 'document', label: 'Document', basePrice: 50 },
  { value: 'small-package', label: 'Small Package', basePrice: 80 },
  { value: 'medium-package', label: 'Medium Package', basePrice: 120 },
  { value: 'large-package', label: 'Large Package', basePrice: 180 },
];

const destinations = [
  { value: 'inside-city', label: 'Inside City', multiplier: 1.0 },
  { value: 'outside-city', label: 'Outside City', multiplier: 1.5 },
  { value: 'suburban', label: 'Suburban Area', multiplier: 1.8 },
];

const breakdown = [
  { label: 'Base Delivery', key: 'base' },
  { label: 'Weight Charge', key: 'weight' },
  { label: 'Distance Charge', key: 'dist' },
];

const infoCards = [
  { value: '৳50', label: 'Starting from', sub: 'inside city' },
  { value: 'Free', label: 'Pickup', sub: 'from your door' },
  { value: '0%', label: 'Hidden Fees', sub: 'transparent pricing' },
];

const Pricing = () => {
  const [parcelType, setParcelType] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    if (!parcelType || !destination || !weight) return;

    const pt = parcelTypes.find(p => p.value === parcelType);
    const dest = destinations.find(d => d.value === destination);
    const kg = parseFloat(weight) || 0;

    const base = pt.basePrice;
    const wCharge = Math.ceil(kg) * 10;
    const dCharge = Math.round((base * (dest.multiplier - 1)));
    const total = base + wCharge + dCharge;

    setResult({ base, weight: wCharge, dist: dCharge, total });
    setCalculated(true);
  };

  const handleReset = () => {
    setParcelType('');
    setDestination('');
    setWeight('');
    setResult(null);
    setCalculated(false);
  };

  const isReady = parcelType && destination && weight;

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
            <div className="flex gap-3 sm:gap-4 shrink-0">
              {infoCards.map(card => (
                <div
                  key={card.label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-5 py-3 text-center"
                >
                  <p className="text-lg sm:text-xl font-extrabold text-primary leading-none mb-0.5">
                    {card.value}
                  </p>
                  <p className="text-xs text-white/60 font-medium">{card.label}</p>
                  <p className="text-xs text-white/30">{card.sub}</p>
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
                    onChange={e => { setParcelType(e.target.value); setCalculated(false); }}
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
                    onChange={e => { setDestination(e.target.value); setCalculated(false); }}
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
                    onChange={e => { setWeight(e.target.value); setCalculated(false); }}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4
                               text-sm text-gray-700 placeholder-gray-400 outline-none
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                  />
                </div>

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
                                active:scale-95 transition-all duration-200
                                ${isReady
                        ? 'bg-primary text-black hover:brightness-105 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Calculate Cost
                  </button>
                </div>
              </div>
            </div>

            {/* ── Result Panel ── */}
            <div className={`rounded-2xl border transition-all duration-300
                            ${calculated
                ? 'bg-primary/5 border-primary/20'
                : 'bg-gray-50 border-gray-100'
              } p-6 sm:p-8`}>

              {!calculated ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center text-center py-10 sm:py-14">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="text-secondary font-semibold text-base sm:text-lg mb-1">
                    Your estimate will appear here
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Fill in the parcel details on the left and hit
                    <span className="text-secondary font-medium"> Calculate Cost</span>.
                  </p>
                </div>
              ) : (
                /* Result */
                <div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                    Estimated Cost
                  </p>
                  <p className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-secondary leading-none mb-2">
                    ৳{result.total}
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    All charges included · No hidden fees
                  </p>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    {breakdown.map(item => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between bg-white rounded-xl
                                   px-4 py-3 border border-gray-100"
                      >
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="text-sm font-bold text-secondary">
                          ৳{result[item.key]}
                        </span>
                      </div>
                    ))}

                    {/* Total row */}
                    <div className="flex items-center justify-between bg-secondary rounded-xl
                                    px-4 py-3 mt-1">
                      <span className="text-sm font-semibold text-white">Total</span>
                      <span className="text-base font-extrabold text-primary">
                        ৳{result.total}
                      </span>
                    </div>
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