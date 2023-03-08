import { useQuery } from "react-query";
import { api } from "@/pages/api";

type Trailer = {
  id: string;
  key: string;
  name: string;
  site: string;
  size: string;
  type: string;
};

type TrailerResponse = {
    id: number,
    results: Trailer[],
}

const fetchTrailers = async (movieId: number) => {
    const {data} = await api.get<TrailerResponse>(`/movie/${movieId}/videos`);
    return data.results;
}

export const  useTrailers = (movieId: number) =>  {
  return useQuery(['trailers', movieId], () => fetchTrailers(movieId))
}


