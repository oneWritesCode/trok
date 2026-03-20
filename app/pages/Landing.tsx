"use client";

import { useSession, signOut } from "next-auth/react";

export default function Landing() {
  const { data: session } = useSession();

   return (
    <div>
      <p>Logged in as {session?.user?.email ?? "user"}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
