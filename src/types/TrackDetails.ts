import React from "react";

export interface TrackDetails {
    name: string;
    type: string;
    tags: string[];
    description: string;
    color: string;
}

export interface TrackContextProps {
    trackDetails: TrackDetails;
    setTrackDetails: React.Dispatch<React.SetStateAction<TrackDetails>>;
}