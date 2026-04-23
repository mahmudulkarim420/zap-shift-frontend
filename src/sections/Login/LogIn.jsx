"use client";

import { useState } from "react";
import { useSignIn, SignInButton } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    if (!isLoaded) return;

    try {
      setIsSubmitting(true);
      setLocalError(null);

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        // Handle additional steps like MFA if necessary
        console.log(result);
      }
    } catch (error) {
      const errorMsg = error.errors?.[0]?.message || "Invalid credentials. Please try again.";
      setLocalError(errorMsg);
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithStrategy({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Google login error:", error.message);
      setLocalError("Google login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mt-10 mb-8 text-center">
        <h2 className="font-extrabold text-4xl text-secondary tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mt-2 font-medium">Log in with ZapShift</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
          <input
            type="email"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
            placeholder="your@email.com"
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2 px-1 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>

        {localError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm font-semibold">{localError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isLoaded}
          className="w-full py-4 bg-primary text-black font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:bg-lime-400 transition transform active:scale-[0.98] uppercase tracking-widest text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center space-y-4 pt-4">
          <p className="text-sm text-gray-600 font-medium">
            Don’t have an account?{" "}
            <Link className="text-secondary font-bold hover:underline" href="/sign-up">
              Register here
            </Link>
          </p>

          <div className="relative flex items-center justify-center py-2">
            <span className="absolute px-4 bg-white text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Or continue with
            </span>
            <div className="w-full border-t border-gray-100"></div>
          </div>

          <SignInButton mode="modal" forceRedirectUrl="/">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-4 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm font-bold text-sm"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign in with Google
            </button>
          </SignInButton>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
