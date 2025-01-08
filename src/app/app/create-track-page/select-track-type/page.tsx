'use client'

import { useTrackForm } from "@/app/contexts/TrackContext";
import TrackType from "@/components/TrackType";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SelectTrackType() {

    const { trackDetails, setTrackDetails } = useTrackForm();

    const [selectedTrackType, setSelectedTrackType] = useState<string | null>(null);

    const trackTypes = [
        { mainText: "Physical Track", subText: "Activities focused on the body, like workouts or sports" },
        { mainText: "Mental Track", subText: "Activities that challenge or engage the mind, like puzzles or meditation" },
        { mainText: "Creative Track", subText: "Activities involving creativity, like art, music, or writing" },
        { mainText: "Social Track", subText: "Activities involving connecting with others, like gatherings or team projects" },
        { mainText: "Skill Track", subText: "Activities to learn or improve a skill, like cooking or coding" },
        { mainText: "Wellness Track", subText: "Activities focused on self-care and overall well-being, like yoga or relaxation" }
    ];

    const handleDoneButton = () => {
        if (selectedTrackType) {
            setTrackDetails({...trackDetails, type: selectedTrackType});
            redirect("/app/create-track-page");
        } else {
            alert("You need to select a type.");
        }
    }

    return (
        <div className="bg-[#F5F7FA] min-h-screen flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg w-[80%] md:w-[60%] p-6">
                <div className="flex flex-col gap-6">
                    {trackTypes.map(({ mainText, subText }) => (
                        <TrackType 
                            key={mainText}
                            mainText={mainText}
                            subText={subText}
                            isSelected={selectedTrackType === mainText}
                            onSelect={() => setSelectedTrackType(mainText as string)}
                        />
                    ))}
                </div>

                {/* Done button */}
                <div className="mt-6">
                    <button
                        onClick={handleDoneButton}
                        className="w-full py-3 text-xl bg-[#4D89A6] text-white rounded-lg"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
