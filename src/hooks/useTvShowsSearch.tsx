import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { TvShow } from "@/types";

type SearchTv = {
  tv: TvShow[];
  total_pages: number;
};

const useTvShowsSearch = (query: string) => {
  return useQuery<SearchTv>(["searchTv", query], async () => {
    if (query) {
      const { data } = await api.get(`/search/tv?query=${query}`);
      return {
        tv: data.results,
        total_pages: data.total_pages,
      };
    } else {
      return {
        tv: [],
        total_pages: 0,
      };
    }
  });
};

export default useTvShowsSearch;
