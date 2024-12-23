"use client"

import axios from "axios";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

function App() {

  const { userId, isLoading } = useSession();
  const router = useRouter();

  const handleRedirect = () => {
    if (userId) {
      router.push("/app/create-track-page/" + userId);
    } else {
      console.error("User ID not available for redirection.");
    }
  }

  return (
    <>
      <div className="border-b-2">
        <div className="pb-4 flex flex-row items-center mt-8 mx-8 justify-between ">
          <div className="flex flex-row gap-8">
            <p className="text-4xl font-semibold text-[#333333]">Track your first activity!</p>
            <button onClick={handleRedirect} className="text-2xl rounded-full py-2 px-8 bg-[#4D89A6]">+</button>
          </div>
          <button onClick={() => signOut()} className="text-2xl rounded-full py-2 px-8 bg-[#4D89A6]">Log out</button>
        </div>
      </div>
    </>
  );
}

export default App;