"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import whiteNboldOne from "@/public/images/whiteNboldOne.png";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  const { data: session } = useSession();
  const [isSettignOptionsOpen, setIsSettignOptionsOpen] =
    useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="text-black min-w-7xl ">
        {/* head */}
        <div className="flex items-center justify-between">
          <p className="uppercase text-2xl">trok</p>
          <div className="relative">
            <button
              className="cursor-pointer"
              onClick={() => setIsSettignOptionsOpen(!isSettignOptionsOpen)}
            >
              <Image src={whiteNboldOne} alt="" className="w-20 rounded-full" />
            </button>
            {isSettignOptionsOpen && (
              <div className="min-w-[10rem] absolute left-[80%] top-[80%] p-1 border border-gray-400 rounded-md">
                <p className="uppercase text-sm text-center font-bold">
                  {session?.user?.name ?? "user"}
                </p>
                <button onClick={() => signOut()}>Logout</button>
              </div>
            )}
          </div>
        </div>
        {/* section */}
        <div className="mt-20 px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-6xl font-black uppercase tracking-tighter">
              Trade the World
            </h2>
            <p className="text-neutral-500 max-w-lg text-lg">
              The simplest way to trade stocks, crypto, and more.
              Experience the future of exchange today.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/stocks"
                className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                Go to Market
              </Link>
              <Link 
                href="/stocks/add"
                className="border-2 border-black text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all"
              >
                Add Stock
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
