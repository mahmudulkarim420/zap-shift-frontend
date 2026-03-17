'use client';

import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../providers/AuthProvider';

const LogIn = () => {
  const router = useRouter();
  const { user, login, googleLogin, userRole } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      router.push(`/`);
    }
  }, [user, userRole, router]);

  const handleLogin = async (data) => {
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message || "Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (error) {
      console.error('Google login error:', error.message);
      alert("Google login is not yet connected to the backend.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mt-10 mb-8 text-center">
        <h2 className="font-extrabold text-4xt text-secondary tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mt-2 font-medium">Log in with ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
          <input
            type="email"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
            placeholder="your@email.com"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2 px-1 font-semibold">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Password</label>
          <input
            type="password"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
            placeholder="••••••••"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2 px-1 font-semibold">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="w-full py-4 bg-primary text-black font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:bg-lime-400 transition transform active:scale-[0.98] uppercase tracking-widest text-sm mt-2">
          Sign In
        </button>

        <div className="text-center space-y-4 pt-4">
          <p className="text-sm text-gray-600 font-medium">
            Don’t have an account?{' '}
            <Link className="text-secondary font-bold hover:underline" href="/register">
              Register here
            </Link>
          </p>

          <div className="relative flex items-center justify-center py-2">
            <span className="absolute px-4 bg-white text-gray-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
            <div className="w-full border-t border-gray-100"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm font-bold text-sm"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
