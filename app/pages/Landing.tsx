"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import whiteNboldOne from "@/public/images/whiteNboldOne.png";
import Image from "next/image";

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
                  {session?.user?.email ?? "user"}
                </p>
                <button onClick={() => signOut()}>Logout</button>
              </div>
            )}
          </div>
        </div>
        {/* section */}
        <div></div>
      </div>
    </div>
  );
}
