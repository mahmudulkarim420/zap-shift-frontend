"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";

const Register = () => {
  const [step, setStep] = useState("signup");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setLocalError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBBB_API_KEY}`,
        formData
      );
      if (response.data?.success) {
        setProfileImage(response.data.data.display_url);
      } else {
        setLocalError("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("IMGBB_UPLOAD_ERROR:", err);
      setLocalError("Error uploading image to ImgBB.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("CLICK_TRIGGERED: Register button clicked successfully!");

    setIsSubmitting(true);
    setLocalError(null);

    try {
      // Direct call to Express backend
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        image: profileImage,
      });

      if (res.data?.success) {
        // Auto sign-in after registration
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!loginRes?.error) {
          console.log("REGISTER_DEBUG: Auto-login successful, forcing transition to dashboard");
          window.location.href = "/dashboard";
        } else {
          setLocalError("Account created but auto-login failed: " + loginRes.error);
        }
      } else {
        setLocalError(res.data?.message || "Registration failed");
      }
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mt-10 mb-8">
        <h2 className="font-extrabold text-4xl text-secondary">
          {step === "verifying" ? "Verify Email" : "Create an Account"}
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          {step === "verifying" ? `Enter the code sent to ${email}` : "Register with ZapShift"}
        </p>
      </div>

      {step === "signup" && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-secondary mb-2 px-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
              placeholder="Your Name"
            />
          </div>

          {/* Premium Image Upload */}
          <div className="relative">
            <label className="block text-sm font-bold text-secondary mb-2 px-1">Profile Picture (Optional)</label>
            <div className={`relative group transition-all duration-300 ${isUploading ? 'opacity-70' : 'opacity-100'}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-dashed transition-all duration-200 
                ${profileImage ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50/50 group-hover:border-primary/50'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 
                  ${profileImage ? 'bg-primary text-black' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  {isUploading ? (
                    <FaSpinner className="animate-spin" />
                  ) : profileImage ? (
                    <FaCheckCircle />
                  ) : (
                    <FaCloudUploadAlt size={20} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-secondary truncate">
                    {isUploading ? "Uploading to ImgBB..." : profileImage ? "Image Uploaded Successfully!" : "Click to upload avatar"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {profileImage ? "Change Image" : "PNG, JPG up to 5MB"}
                  </p>
                </div>
              </div>
            </div>
            {profileImage && (
              <div className="mt-3 flex justify-center">
                 <div className="w-16 h-16 rounded-2xl border-2 border-primary/20 p-1 bg-white overflow-hidden shadow-sm">
                    <img src={profileImage} alt="Avatar Preview" className="w-full h-full object-cover rounded-xl" />
                 </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-2 px-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-2 px-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all bg-gray-50/50"
              placeholder="••••••••"
            />
          </div>

          {localError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm font-semibold">{localError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-4 bg-primary text-black font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:bg-lime-400 transition transform active:scale-[0.98] uppercase tracking-widest text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : isUploading ? "Waiting for upload..." : "Register Now"}
          </button>

          <div className="text-center space-y-4 pt-4">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <Link className="text-secondary font-bold hover:underline" href="/sign-in">
                Login here
              </Link>
            </p>

            <div className="relative flex items-center justify-center py-2">
              <span className="absolute px-4 bg-white text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                Or continue with
              </span>
              <div className="w-full border-t border-gray-100"></div>
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
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
              Sign up with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
