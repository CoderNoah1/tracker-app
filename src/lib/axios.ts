import { TrackDetailsType } from "@/types/TrackDetailsType";
import axios from "axios";

const api = {
    createNewTag: async (tagContentData: string) => {
        const { data } = await axios.post("/api/create-tag", {content: tagContentData});
        return data;
    },
    getAllUserTags: async (userId: string) => {
        const { data } = await axios.get("/api/get-all-user-tags/" + userId);
        return data;
    },
    createTrack: async (trackDetails: TrackDetailsType) => {
        const { data } = await axios.post("/api/create-track", trackDetails);
        return data;
    }
}

export default api;