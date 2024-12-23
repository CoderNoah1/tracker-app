"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useParams } from "next/navigation";

type Tag = {
	id: string;
	content: string;
}

export default function CreateTrackPage() {

  const params = useParams();

  // State to manage dropdown visibility
	const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false);
	const [isTagSelected, setIsTagSelected] = useState<boolean[]>([]);
  
  const defaultTags = [
    { content: "Work" },
    { content: "Study" },
    { content: "Workout" },
    { content: "Reading" },
    { content: "Gaming" },
    { content: "Friends" },
    { content: "Family" },
    { content: "Learning" },
    { content: "Goals" },
    { content: "Errands" }
  ];

  const { data: tags, isSuccess } = useQuery<Tag[]>({
    queryKey: ['tags', params.userId],
    queryFn: () => api.getAllUserTags(params.userId as string)
  })

  const allTags = [...defaultTags, ...(Array.isArray(tags) ? tags : [])];

	useEffect(() => {
		if (tags && isSuccess) {
			setIsTagSelected(Array(tags.length).fill(false))
		}
	}, [tags, isSuccess])

  // Toggle the dropdown menu
  const toggleTagsMenu = () => {
    setIsTagsMenuOpen(!isTagsMenuOpen);
  };

  const handleIsTagSelected = (index: number) => {
    setIsTagSelected((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    })
  };

  return (
    <>
      <div className="flex flex-col px-4 pt-2">
        {/* Activity Name */}
        <div className="flex flex-row justify-between w-full text-4xl p-2 bg-[#FFFFFF]">
          <p>Activity Name</p>
          <input type="text" placeholder="Playing the guitar..." className="border p-2" />
        </div>

        {/* Activity Type */}
        <div className="flex flex-row justify-between w-full text-4xl p-2 bg-[#FFFFFF]">
          <p>Activity Type</p>
          <Link href={"/app/activity-type"}>{">"}</Link>
        </div>

        {/* Add Tags Section */}
        <div className="flex flex-col w-full text-4xl p-2 bg-[#FFFFFF]">
          <div className="flex flex-row justify-between items-center">
            <p>Add Tags</p>
            <button
              onClick={toggleTagsMenu}
              className="text-2xl border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              {isTagsMenuOpen ? "Close" : "Show Tags"}
            </button>
          </div>

          {/* Dropdown Menu for Tags */}
          {isTagsMenuOpen ? (
            <div className="grid grid-cols-auto-fit gap-4 mt-4 p-2 bg-gray-100 border rounded max-h-64 overflow-y-scroll" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }} >
              {allTags.map((tag, index) => (
                <button
                  key={index} 
                  onClick={() => handleIsTagSelected(index)} 
                  className={`text-2xl rounded-full py-2 px-8 cursor-pointer ${isTagSelected[index] ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {tag.content}
                </button>
              ))}
              <Link
                className="text-2xl rounded-full py-2 px-8 cursor-pointer bg-[#4D89A6]"
                href={"/app/create-tag"}
              >
                Add Tag
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}