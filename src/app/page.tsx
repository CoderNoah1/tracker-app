"use client"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  const { data: session } = useSession();

  if (session) {
    return redirect('/app');
  }

  return (
    <>
      <div className="flex flex-col items-center m-[200px] gap-2">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-semibold text-[#333333]">Tracker</h1>
          <p className="text-xl text-[#777777]">Track everything you're heart desires!</p>
        </div>
        <button onClick={() => signIn("github")} className="text-2xl rounded-full py-2 px-8 bg-[#4D89A6]">Sign in with GitHub!</button>
        <h6>Dont have a GitHub account yet? sign up <Link href="https://github.com" className="hover:text-[#1F8EE1]">here</Link>.</h6>
      </div>
    </>
  );
}
