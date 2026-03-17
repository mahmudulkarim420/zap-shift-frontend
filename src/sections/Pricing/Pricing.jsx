import React from 'react';

const Pricing = () => {
  return (
    <main className="min-h-screen py-10">
      <section className="rounded-[28px] bg-white p-6 shadow-sm md:p-10">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-extrabold text-[#0d3b45] md:text-5xl">
            Pricing Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero
            hassle. From personal packages to business shipments — we deliver on
            time, every time.
          </p>
        </div>

        {/* Calculator Box */}
        <div className="rounded-[24px] bg-[#f9fafb] px-4 py-8 md:px-10 md:py-12">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#0d3b45]">
            Calculate Your Cost
          </h2>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Form */}
            <div className="mx-auto w-full max-w-md">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Parcel type
                  </label>
                  <select className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-lime-400">
                    <option>Select Parcel type</option>
                    <option>Document</option>
                    <option>Small Package</option>
                    <option>Medium Package</option>
                    <option>Large Package</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Delivery Destination
                  </label>
                  <select className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-lime-400">
                    <option>Select Delivery Destination</option>
                    <option>Inside City</option>
                    <option>Outside City</option>
                    <option>Suburban Area</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    placeholder="Contact"
                    className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-lime-400"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button className="rounded-lg border border-lime-400 px-6 py-3 text-sm font-semibold text-[#0d3b45] transition hover:bg-lime-50">
                    Reset
                  </button>
                  <button className="flex-1 rounded-lg bg-lime-400 px-6 py-3 text-sm font-semibold text-[#0d3b45] transition hover:bg-lime-500">
                    Calculate
                  </button>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-black sm:text-6xl md:text-7xl">
                  50 Tk
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;