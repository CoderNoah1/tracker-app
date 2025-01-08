'use client'

import { TrackTypeProps } from "@/types/TrackTypeProps";

export default function TrackType({ mainText, subText, isSelected, onSelect }: TrackTypeProps ) {

    return (
        <div
            onClick={onSelect}
            className={`flex flex-col gap-2 md:flex-row justify-between items-center border-b border-[#D3D8E2] py-4 px-4 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-[#E8F7FF]" : "bg-white"}`}
        >
            <h1 className="text-2xl font-bold text-[#4D89A6] text-center md:text-left">
                {mainText}
            </h1>
            <p className="text-base md:text-lg text-[#6C757D] text-center md:text-right">
                {subText}
            </p>
        </div>
    );
}
