'use client';

import Image from 'next/image';
import image from '@/app/assets/agent-pending.png';

const perks = [
  { icon: '💰', title: 'Daily Earnings', desc: 'Get paid daily with transparent per-delivery rates.' },
  { icon: '🕐', title: 'Flexible Hours', desc: 'Work on your schedule — morning, afternoon or evening.' },
  { icon: '📍', title: 'Local Routes', desc: 'Deliver in your own area — no long-distance required.' },
  { icon: '🛡️', title: 'Full Support', desc: 'Dedicated rider support team available 24/7.' },
];

const inputClass = `h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4
                    text-sm text-gray-700 placeholder-gray-400 outline-none
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all duration-200`;

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Rider = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Auth logic removed as per request
    console.log("Rider application submitted:", data);
  };

  return (
    <main className="min-h-screen py-10 sm:py-14">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

        {/* ── Header Band ── */}
        <div className="bg-secondary px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
                Join Our Team
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-3">
                Become a ZapShift{' '}
                <span className="text-primary">Rider Today</span>
              </h1>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Earn on your own schedule, deliver in your local area, and be
                part of Bangladesh's fastest-growing delivery network.
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex gap-3 sm:gap-4 shrink-0 flex-wrap">
              {[
                { value: '500+', label: 'Active Riders' },
                { value: '64', label: 'Districts' },
                { value: '24/7', label: 'Support' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-5 py-3 text-center"
                >
                  <p className="text-lg sm:text-xl font-extrabold text-primary leading-none mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: Form ── */}
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                Application Form
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-secondary mb-7">
                Tell Us About Yourself
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      Full Name
                    </label>
                    <input type="text" placeholder="e.g. Rahim Uddin" className={inputClass} {...register('name', { required: true })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      Age
                    </label>
                    <input type="number" placeholder="e.g. 24" min="18" className={inputClass} {...register('age')} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      Email Address
                    </label>
                    <input type="email" placeholder="you@example.com" className={inputClass} {...register('email', { required: true })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      Password
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClass} {...register('password', { required: true, minLength: 6 })} />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      NID Number
                    </label>
                    <input type="text" placeholder="National ID No." className={inputClass} {...register('nid')} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                      Contact Number
                    </label>
                    <input type="tel" placeholder="01XXXXXXXXX" className={inputClass} {...register('phone', { required: true })} />
                  </div>
                </div>

                {/* Warehouse */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-secondary uppercase tracking-wide">
                    Preferred Warehouse
                  </label>
                  <select className={`${inputClass} appearance-none cursor-pointer`} {...register('warehouse')}>
                    <option value="">Select a warehouse</option>
                    <option>Dhaka Central Hub</option>
                    <option>Chittagong Port Hub</option>
                    <option>Sylhet Hub</option>
                    <option>Rajshahi Hub</option>
                    <option>Khulna Hub</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 bg-primary text-black font-extrabold text-sm sm:text-base
                                rounded-full shadow hover:brightness-105 active:scale-95
                                transition-all duration-200 uppercase tracking-widest"
                  >
                    Submit Application
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Our team will review your application and contact you within 48 hours.
                  </p>
                </div>
              </form>
            </div>

            {/* ── Right: Illustration + Perks ── */}
            <div className="flex flex-col gap-6">

              {/* Illustration card */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8
                              flex flex-col items-center justify-center text-center min-h-[220px]">
                <Image
                  src={image}
                  alt="ZapShift delivery rider"
                  width={200}
                  height={200}
                  className="w-36 sm:w-44 lg:w-48 object-contain mb-4"
                />
                <p className="text-secondary font-bold text-base sm:text-lg">
                  Join 500+ Active Riders
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Delivering smiles across Bangladesh every day
                </p>
              </div>

              {/* Perks grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {perks.map((perk, i) => (
                  <div
                    key={i}
                    className="group bg-white border border-gray-100 rounded-2xl p-4 sm:p-5
                               hover:border-primary/30 hover:shadow-md
                               transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20
                                    rounded-xl flex items-center justify-center text-lg mb-3
                                    transition-colors duration-200">
                      {perk.icon}
                    </div>
                    <h4 className="font-bold text-secondary text-sm mb-1">{perk.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Rider;