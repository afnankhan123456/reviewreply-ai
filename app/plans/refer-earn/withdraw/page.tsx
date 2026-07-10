"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default function WithdrawPage() {
  const [formData, setFormData] = useState({
    upiId: "",
    name: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    upiId: "",
    name: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      upiId: "",
      name: "",
      phoneNumber: "",
    };
    let isValid = true;

    if (!formData.upiId.trim()) {
      newErrors.upiId = "UPI ID is required";
      isValid = false;
    } else if (!formData.upiId.includes("@")) {
      newErrors.upiId = "Please enter a valid UPI ID";
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Error submitting withdrawal request");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-black px-6 py-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img 
              src="https://raw.githubusercontent.com/afnankhan123456/reviewreply-ai/main/public/ai-logo.png" 
              alt="ReviewReply AI" 
              className="h-10 w-auto object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">ReviewReply AI</span>
              <span className="text-[10px] text-gray-500 -mt-0.5">AI Powered Review Management</span>
            </div>
          </div>
          <Link
            href="/plans/refer-earn"
            className="bg-white border border-gray-200 hover:border-indigo-400 px-5 py-2.5 rounded-2xl shadow-sm transition font-medium text-gray-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        {/* Withdraw Form */}
        <div className="max-w-md mx-auto mt-10">
          {!submitted ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Withdraw Your Earnings</h2>
                <p className="text-sm text-gray-500 mt-2">Enter your details to withdraw your earnings</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* UPI ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">UPI ID *</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="example@upi"
                    className={`w-full border ${errors.upiId ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition`}
                  />
                  {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                    className={`w-full border ${errors.phoneNumber ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500 transition`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 mt-6"
                >
                  {submitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Withdrawal Request
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
              <p className="text-sm text-gray-800 font-semibold mb-2">✅ Payment will be received within 48 hours.</p>
              <p className="text-xs text-gray-400 mb-6">
                If payment not received, please{" "}
                <Link href="/plans/refer-earn" className="text-[#7c5cfc] underline font-medium">
                  raise a ticket
                </Link>
                .
              </p>
              <Link
                href="/plans/refer-earn"
                className="inline-flex items-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-6 py-3 rounded-xl font-medium text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Refer & Earn
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
