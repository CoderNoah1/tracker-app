"use client"
import useSession from "@/hooks/useSession";
import api from "@/lib/axios"
import { Tag } from "@/types/Tag";
import { useMutation, useQuery } from "@tanstack/react-query"
import { redirect } from "next/navigation";
import { useState } from "react"

function createTag() {

  const { userId, isLoading } = useSession();
  const [inputContent, setInputContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const createNewTag = useMutation({
    mutationFn: () => api.createNewTag(inputContent),
    onSuccess: () => {
      setInputContent("");
    }
  });

  const getAllUserTags = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => api.getAllUserTags(userId as string),
    enabled: !!userId && !isLoading
  });

  const handleCreateTag = () => {

    if (getAllUserTags.data) {
      for (let i = 0; i < getAllUserTags.data.length; i++) {
        if (getAllUserTags.data[i].content === inputContent) {
          setIsError(true);
          setError("A tag with this name already exists. Please enter a unique tag.");
          return;
        }
      }
    }

    if (inputContent.trim() === "") {
      alert("Please enter a tag before submitting")
      return
    }
    createNewTag.mutate();
    redirect("/app/create-track-page")
  }

  return (
    <div className="flex flex-col items-center gap-6 justify-center w-full mt-[150px] px-4">
      {/* Error Message */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-2 rounded-lg mb-4 w-full max-w-md text-center">
          <p>{error}</p>
        </div>
      )}
  
      {/* Input and Button Container */}
      <div className="flex flex-col gap-4 items-center w-full max-w-md">
        <input
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          type="text"
          placeholder="Enter your tag name"
          className="border p-3 w-full rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
  
        <button
          onClick={handleCreateTag}
          className="text-2xl rounded-xl py-3 px-8 cursor-pointer bg-green-500 text-white hover:bg-green-600 transition duration-200 w-full"
        >
          Create New Tag
        </button>
      </div>
    </div>
  );
  
}

export default createTag;