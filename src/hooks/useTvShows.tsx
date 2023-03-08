import { useQuery } from "react-query";
import { TvShow } from "@/types";
import { api } from "@/pages/api";

type TvShows = {
  tv: TvShow[];
  total_pages: number;
};

const useTvShows = (page: number) => {
  return useQuery<TvShows>("tvShows", async () => {
    const { data } = await api.get(`/tv/popular?page=${page}`);
    return {
      tv: data.results,
      total_pages: data.total_pages,
    };
  });
};

export default useTvShows;
