import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { Movie } from "@/types";

type MovieData = {
    movies: Movie[],
    total_pages: number;
}


const useMoviesQuery = (page: number, query: string = "", selectedGenre: number[] = []) => {
  return useQuery<MovieData>(
    ["movies",  page, query, selectedGenre],
    async () => {
        const {data} = await api.get(`/movie/popular?page=${page}`);
        return {
            movies: data.results,
            total_pages: data.total_pages
        }
    }
  )
}

export default useMoviesQuery