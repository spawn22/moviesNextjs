import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { Movie } from "@/types";

type MovieData = {
    movies: Movie[],
    total_pages: number;
}

// const useMoviesQuery = (genreId: number | null, page: number) => {
//   return useQuery<MovieData>(
//     ["discover", genreId, page],
//     async () => {
//         const {data} = await api.get(`/discover/movie`, {
//           params: {
//             with_genres: genreId,
//             page,
//           },
//         });
//         return {
//             movies: data.results,
//             total_pages: data.total_pages
//         }
//     },
//   )
// }


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