"use client"
import useSession from "@/hooks/useSession";
import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { redirect } from "next/navigation";
import { useState } from "react"

function createTag() {

  const { userId, isLoading } = useSession()
  const [inputContent, setInputContent] = useState("");

  const createNewTag = useMutation({
    mutationFn: () => api.createNewTag(inputContent),
    onSuccess: () => {
      setInputContent("");
    }
  });

  const handleCreateTag = () => {
    if (inputContent.trim() === "") {
      alert("Please enter a tag before submitting")
      return
    }
    createNewTag.mutate();
    redirect("/app/create-track-page/" + userId)
  }

  return (
    <div className="flex gap-2 justify-center w-full mt-[200px]">
        <input value={inputContent} onChange={(e) => setInputContent(e.target.value)} type="text" placeholder="Playing the guitar..." className="border p-2 w-[50%] rounded-xl" />
        <button onClick={handleCreateTag} className="text-2xl rounded-xl py-2 px-8 cursor-pointer bg-green-500">Create new Tag</button>
    </div>
  )
}

export default createTag;