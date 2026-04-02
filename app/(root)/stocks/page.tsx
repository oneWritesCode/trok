"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Plus, Search, Filter, Loader2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Stock {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  volatility: number;
  createdAt: string;
}

export default function StocksListPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) throw new Error("Failed to fetch stocks");
        const data = await response.json();
        setStocks(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch stocks");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Market Overview</h1>
            <p className="text-neutral-400 text-lg">Real-time asset tracking and performance metrics.</p>
          </div>
          <Link
            href="/stocks/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add New Asset
          </Link>
        </div>

        {/* Filters and Search Placeholder */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by asset name or description..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-neutral-400 font-medium">Synchronizing with exchange...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        ) : stocks.length === 0 ? (
          <div className="bg-neutral-900 border border-dashed border-neutral-800 rounded-3xl p-20 text-center">
            <TrendingUp className="w-16 h-16 text-neutral-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2">No assets listed yet</h3>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Start by adding your first stock or crypto asset to begin tracking performance.
            </p>
            <Link
              href="/stocks/add"
              className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-950 px-8 py-4 rounded-2xl font-bold transition-all"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-neutral-900/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-blue-400" />
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-500/10 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-500 uppercase font-bold tracking-widest mb-1">Price</p>
                    <p className="text-2xl font-bold text-white">${stock.currentPrice.toLocaleString()}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{stock.name}</h3>
                <p className="text-neutral-400 text-sm line-clamp-2 mb-6">
                  {stock.description}
                </p>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Volatility</span>
                    <span className="text-emerald-400 font-bold">{stock.volatility}x</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Added</span>
                    <span className="text-neutral-300 text-xs">
                      {new Date(stock.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
