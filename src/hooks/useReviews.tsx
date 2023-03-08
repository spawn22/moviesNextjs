import {useQuery} from "react-query";
import { api } from "@/pages/api";

type Review = {
    id: string,
    author: string,
    content: string,
    url: string,
}

type ReviewResponse = {
    results: Review[];
}

const fetchReview = async (movieId: number) => {
    const {data} = await api.get<ReviewResponse>(`/movie/${movieId}/reviews`)
    
    return data.results
}
const useReviews = (movieId: number) => {
  return useQuery(['reviews', movieId], () => fetchReview(movieId))
}

export default useReviews