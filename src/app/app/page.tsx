"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function App() {

  const router = useRouter();

  return (
    <>
      <div className="border-b-2">
        <div className="pb-4 flex flex-row items-center mt-8 mx-8 justify-between ">
          <div className="flex flex-row gap-8">
            <p className="text-4xl font-semibold text-[#333333]">Track your first activity!</p>
            <button onClick={() => router.push("/app/create-track-page")} className="text-2xl rounded-full py-2 px-8 bg-[#4D89A6]">+</button>
          </div>
          <button 
            onClick={async () => {
              try {
                await signOut({ redirect: false });
                console.log("Sign out succesfull");
                router.push("/")
              } catch (error) {
                console.error("signOut error: ", error)
              }
            }} 
            className="text-2xl rounded-full py-2 px-8 bg-[#4D89A6]"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

export default App;