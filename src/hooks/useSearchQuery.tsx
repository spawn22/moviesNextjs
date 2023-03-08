import { useQuery, UseQueryResult  } from "react-query"
import { api } from "@/pages/api"
import { Movie } from "@/components/Movies"

type SearchData = {
    movies: Movie[],
    total_pages: number,
}

const useSearchQuery = (query: string, page: number): UseQueryResult<SearchData> => {
  return useQuery<SearchData>(
    ["search", query, page],
    async () => {
        if(query){
            const {data} = await api.get(`/search/movie?query=${query}&page=${page}`);
            return {
                movies: data.results,
                total_pages: data.total_pages,
            }
        } else {
            return {
                movies: [],
                total_pages: 0,
            }
        }
    },
    { enabled: Boolean(query) }
  )
}

export default useSearchQuery