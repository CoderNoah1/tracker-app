"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import useSession from "@/hooks/useSession";
import { Tag } from "@/types/Tag";
import { useTrackForm } from "@/app/contexts/TrackContext";
import { redirect } from "next/navigation";


export default function CreateTrackPage() {

    const { userId, isLoading } = useSession();
    const { trackDetails, setTrackDetails } = useTrackForm();

    // State to manage dropdown visibility
    const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const defaultTags = [
        { content: "Work", id: "1", userId: userId as string },
        { content: "Study", id: "2", userId: userId as string },
        { content: "Workout", id: "3", userId: userId as string },
        { content: "Reading", id: "4", userId: userId as string },
        { content: "Gaming", id: "5", userId: userId as string },
        { content: "Friends", id: "6", userId: userId as string },
        { content: "Family", id: "7", userId: userId as string },
        { content: "Learning", id: "8", userId: userId as string },
        { content: "Goals", id: "9", userId: userId as string },
        { content: "Errands", id: "10", userId: userId as string }
    ];

    const { data: tags, isSuccess } = useQuery<Tag[]>({
        queryKey: ['tags', userId],
        queryFn: () => api.getAllUserTags(userId as string),
        enabled: !!userId
    });

    const allTags: Tag[] = [...defaultTags, ...(Array.isArray(tags) ? tags : [])];

    useEffect(() => {
        console.log(trackDetails); // Log trackDetails when it changes
    }, [trackDetails]);

    // Toggle the dropdown menu
    const toggleTagsMenu = () => {
        setIsTagsMenuOpen(!isTagsMenuOpen);
    };

    const toggleTagSelection = (tag: Tag) => {
        setTrackDetails((prevDetails) => {
            const isTagSelected = prevDetails.tags.includes(tag.content);

            return {
                ...prevDetails,
                tags: isTagSelected
                    ? prevDetails.tags.filter((t) => t !== tag.content)
                    : [...prevDetails.tags, tag.content]
            };
        })
    };

    const createTrack = useMutation({
        mutationFn: () => api.createTrack(trackDetails),
        onSuccess: () => {
            console.log("Track created successfully!");
            redirect("/app");
        }
    });

    return (
        <>
            <div className="flex flex-col px-4 pt-2 space-y-6 bg-gradient-to-b from-[#E0F7FA] to-[#B2EBF2] min-h-screen">

                {/* Track Name */}
                <div className="flex flex-col items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg">
                    <p className="mb-2 text-[#00796B]">Track Name</p>
                    <input
                        type="text"
                        placeholder="Playing the guitar..."
                        className="border p-2 text-2xl rounded-lg w-full max-w-md focus:ring-2 focus:ring-[#00796B]"
                        onChange={(e) => setTrackDetails({...trackDetails, name: e.target.value})}
                        value={trackDetails.name}
                    />
                </div>

                {/* Track Type */}
                <Link
                    href={"/app/create-track-page/select-track-type"}
                    className="flex flex-row justify-between items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg hover:bg-[#B2EBF2] transition"
                >
                    <p className="text-[#00796B]">Track Type</p>
                    <div className="text-2xl text-[#00796B]">{">"}</div>
                </Link>

                {/* Add Tags Section */}
                <div className="flex flex-col items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-row justify-between items-center w-full max-w-md">
                        <p className="text-[#00796B]">Add Tags</p>
                        <button
                            onClick={toggleTagsMenu}
                            className="text-2xl border px-4 py-2 rounded bg-[#00796B] text-white hover:bg-[#004D40] transition"
                        >
                            {isTagsMenuOpen ? "Close" : "Show Tags"}
                        </button>
                    </div>

                    {/* Dropdown Menu for Tags */}
                    {isTagsMenuOpen && (
                        <div
                            className="grid grid-cols-auto-fit gap-4 mt-4 p-4 bg-gray-100 border rounded-lg max-h-64 overflow-y-scroll w-full max-w-md"
                            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
                        >
                            {allTags.map((tag, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => toggleTagSelection(tag)} // Toggle the tag selection
                                        className={`text-2xl rounded-full py-2 px-8 cursor-pointer ${
                                            trackDetails.tags.includes(tag.content) ? "bg-[#00796B] text-white" : "bg-[#B2EBF2] text-[#00796B]"
                                        } hover:bg-[#004D40] transition`}
                                    >
                                        {tag.content}
                                    </button>
                                </div>
                            ))}
                            <Link
                                className="text-2xl rounded-full py-2 px-8 cursor-pointer bg-[#00796B] text-white hover:bg-[#004D40] transition"
                                href={"/app/create-track-page/create-tag"}
                            >
                                Add Tag
                            </Link>
                        </div>
                    )}
                </div>

                {/* Track Description */}
                <div className="flex flex-col items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg">
                    <p className="mb-2 text-[#00796B]">Track Description</p>
                    <textarea
                        placeholder="Describe your track..."
                        className="border p-2 text-2xl rounded-lg w-full max-w-md h-32 focus:ring-2 focus:ring-[#00796B]"
                        onChange={(e) => setTrackDetails({...trackDetails, description: e.target.value})}
                        value={trackDetails.description}
                    ></textarea>
                </div>

                {/* Pick a Color For the Track */}
                <div className="flex flex-col items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg">
                    <p className="mb-4 text-[#00796B]">Pick a Color</p>
                    <input 
                        type="color" 
                        className="border rounded-lg w-16 h-16"
                        onChange={(e) => setTrackDetails({...trackDetails, color: e.target.value})}
                        value={trackDetails.color}
                    />
                </div>

                {/* Submitt button */}
                <div className="flex flex-col items-center w-full text-4xl p-6 bg-white rounded-lg shadow-lg">
                    <button onClick={() => createTrack.mutate()} className="text-2xl border px-16 py-2 rounded bg-[#00796B] text-white hover:bg-[#004D40] transition">Submitt</button>
                </div>
            </div>
        </>
    );
}