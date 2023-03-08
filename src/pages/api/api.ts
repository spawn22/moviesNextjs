import axios from "axios";

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = "f9cc52a19e3c81647d8eccd0f9724c32"
const instance = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: API_KEY,
    }
})

export default instance;