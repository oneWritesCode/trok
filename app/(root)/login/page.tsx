"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center">
//           loading
//       </div>
//     );
//   }

//   if (status === "authenticated") {
//     return (
//       <div>
//         <p>Logged in as {session.user?.email}</p>
//         <button onClick={() => signOut()}>Logout</button>
//       </div>
//     );
//   }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="px-10 py-1 bg-white text-black rounded-xl capitalize text-xl cursor-pointer"
      >
        Login with Google
      </button>
    </div>
  );
}
