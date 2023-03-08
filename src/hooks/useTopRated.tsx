import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { TopRated } from "@/types";


type TopRatedData = {
  map(arg0: (movie: any) => JSX.Element): import("react").ReactNode;
  length: number;
  movies: TopRated[];
}



const useTopRated = () => {
  return useQuery<TopRatedData>(
    ["topRated"],
    async () => {
      const {data} = await api.get(`/movie/top_rated`);
      return data.results;
    }
  )
};

export default useTopRated;
