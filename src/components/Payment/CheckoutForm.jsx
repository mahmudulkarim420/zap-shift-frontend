"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { FaSpinner, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CheckoutForm({ parcelId, amount, onSuccess, onCancel, token }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Create Payment Intent on server
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-payment-intent`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const clientSecret = data.clientSecret;

      // 2. Confirm Payment on Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // 3. Confirm success on our server
          const confirmRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/success`,
            { 
              parcelId, 
              amount, 
              transactionId: result.paymentIntent.id 
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (confirmRes.data.success) {
            Swal.fire({
              title: "Payment Secured!",
              text: "Your delivery is now authorized and ready for pickup.",
              icon: "success",
              confirmButtonColor: "#C8FF65",
            });
            onSuccess();
          }
        }
      }
    } catch (err) {
      console.error("Stripe Checkout Error:", err);
      setError("An unexpected error occurred. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-2">
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Card Details</label>
        <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#033C3F",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full py-4 bg-secondary text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {processing ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaLock className="text-[10px]" />
              Pay ৳{amount} Securely
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="w-full py-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
        >
          Cancel Transaction
        </button>
      </div>

      <p className="text-[10px] text-center text-gray-400 font-medium">
        Payments are encrypted and secured by <strong>Stripe</strong>.
      </p>
    </form>
  );
}
