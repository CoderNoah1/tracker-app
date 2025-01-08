"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { TrackDetailsType } from "@/types/TrackDetailsType";

const TrackFormContext = createContext<{
    trackDetails: TrackDetailsType;
    setTrackDetails: React.Dispatch<React.SetStateAction<TrackDetailsType>>
} | undefined>(undefined);

export const TrackFormProvider = ({ children }: { children: ReactNode }) => {
    const [trackDetails, setTrackDetails] = useState<TrackDetailsType>({
        name: "",
        type: "",
        tags: [],
        description: "",
        color: "",
    });

    return (
        <TrackFormContext.Provider value={{ trackDetails, setTrackDetails }}>
            {children}
        </TrackFormContext.Provider>
    );
};

export const useTrackForm = () => {
    const context = useContext(TrackFormContext);
    if (!context) {
        throw new Error("useTrackForm must be used within a TrackFormProvider");
    }
    return context;
};
