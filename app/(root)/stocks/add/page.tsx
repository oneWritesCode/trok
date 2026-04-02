"use client";

import { useState } from "react";
import { LayoutGrid, TrendingUp, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddStockPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currentPrice: "",
    volatility: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        name: formData.name.trim().toUpperCase(),
        description: formData.description.trim(),
        currentPrice: Number(formData.currentPrice),
        volatility: Number(formData.volatility),
      };

      if (!payload.name || !payload.description) {
        throw new Error("Name and description are required");
      }

      if (!Number.isFinite(payload.currentPrice) || payload.currentPrice <= 0) {
        throw new Error("Current price must be greater than 0");
      }

      if (!Number.isFinite(payload.volatility) || payload.volatility < 0) {
        throw new Error("Volatility must be 0 or greater");
      }

      const response = await fetch("/api/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to add stock");
      }

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        currentPrice: "",
        volatility: "",
      });
      
      // Optional: redirect or show success message
      // setTimeout(() => router.push("/stocks"), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Link 
            href="/" 
            className="flex items-center text-neutral-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add Market Stock</h1>
              <p className="text-neutral-400 mt-1">List a new company or index on the exchange.</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stock Name */}
              <div className="space-y-2 col-span-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-300">
                  Stock Name (Symbol)
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. BTC, AAPL, RELIANCE"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-none"
                />
              </div>

              {/* Current Price */}
              <div className="space-y-2">
                <label htmlFor="currentPrice" className="text-sm font-medium text-neutral-300">
                  Initial Market Price ($)
                </label>
                <input
                  id="currentPrice"
                  name="currentPrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  placeholder="e.g. 150.50"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* Volatility */}
              <div className="space-y-2">
                <label htmlFor="volatility" className="text-sm font-medium text-neutral-300">
                  Volatility Index (0.1 - 5.0)
                </label>
                <input
                  id="volatility"
                  name="volatility"
                  type="number"
                  min="0"
                  step="0.1"
                  required
                  placeholder="e.g. 1.5"
                  value={formData.volatility}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 col-span-2">
                <label htmlFor="description" className="text-sm font-medium text-neutral-300">
                  Market Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Provide details about the asset's market position, utility, or project background..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                />
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300">Asset successfully registered in the market!</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Add to Market Exchange
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-500 text-xs mt-8">
          By adding this asset, you confirm it complies with market regulations and pricing volatility standards.
        </p>
      </div>
    </div>
  );
}
