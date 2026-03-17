// Rider.jsx
import Image from 'next/image';
import image from '@/app/assets/agent-pending.png';

const Rider = () => {
  return (
    <div className="min-h-screen flex py-15">
      <div className="w-full bg-white rounded-2xl px-10 py-10 flex flex-col lg:flex-row gap-10 shadow-sm">
        {/* Left side: text + form */}
        <div className="flex-1">
          <h2 className="text-secondary font-bold text-4xl">Be a Rider</h2>
          <p className="text-gray-500 mt-4 max-w-xl leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <hr className="my-8 border-gray-200" />

          <h3 className="text-lg font-extrabold text-secondary mb-4">
            Tell us about yourself
          </h3>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">Your age</label>
                <input
                  type="text"
                  placeholder="Your age"
                  className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">
                  Your Region
                </label>
                <select className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400">
                  <option>Select your region</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">NID No</label>
                <input
                  type="text"
                  placeholder="NID"
                  className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-secondary mb-1">Contact</label>
                <input
                  type="text"
                  placeholder="Contact"
                  className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-secondary mb-1">
                Which wire-house you want to work?
              </label>
              <select className="h-10 px-3 rounded border border-slate-200 text-sm text-slate-800 bg-white outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400">
                <option>Select wire-house</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 w-full h-10 bg-lime-400 hover:bg-lime-500 text-sm font-medium text-slate-900 rounded transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right side: illustration */}
        <div className="flex-1 mt-60 flex items-center justify-center">
          {/* Replace src with your own image path */}
          <Image src={image} alt="Delivery rider" width={300} height={288} className="max-h-72 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
