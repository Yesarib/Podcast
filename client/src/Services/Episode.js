import axios from "axios";
import { BASE_URL } from "../config";


const getPodcastEpisodesById = async(id) => {
    try {
        return await axios.get(BASE_URL + "/api/getPodcastEpisodesById/" + id).then((res)=> {
            if (res) {
                return res.data
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const getEpisodes = async() => {
    try {
        return await axios.get(BASE_URL + "/api/getEpisodes").then((res)=> {
            if (res) {
                return res.data
            }
        })
    } catch (error) {
        console.log(error);
    }
}


const episodesService = {
    getPodcastEpisodesById,
    getEpisodes,
}

export default episodesService;