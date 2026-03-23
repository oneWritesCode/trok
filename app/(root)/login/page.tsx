"use client";

import { useSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-lg">Logged in as {session?.user?.email}</p>
        <a
          href="/"
          className="px-6 py-2 bg-white text-black rounded-xl text-lg hover:opacity-90 transition-opacity"
        >
          Go to App
        </a>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-10 py-3 bg-white text-black rounded-xl capitalize text-xl cursor-pointer hover:opacity-90 transition-opacity"
      >
        Login with Google
      </button>
    </div>
  );
}