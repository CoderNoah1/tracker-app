import axios from "axios";

const api = {
    createNewTag: async (tagContentData: string) => {
        const { data } = await axios.post("/api/create-tag", {content: tagContentData});
        return data;
    },
    getAllUserTags: async (userId: string) => {
        const { data } = await axios.get("/api/get-all-user-tags/" + userId);
        return data;
    }
}

export default api;