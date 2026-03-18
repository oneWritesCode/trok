"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button>Loading...</button>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Logged in as {session.user?.email}</p>
        <button onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")}>
      Login with Google
    </button>
  );
}