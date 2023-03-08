import { useEffect, useState } from "react";
import { TvShow } from "@/types";
import { api } from "@/pages/api";

type TvShows = {
  tv: TvShow[];
  total_pages: number;
};

const useTvShows = (page: number) => {
  const [tvShows, setTvShows] = useState<TvShows | null>(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      const { data } = await api.get(`/tv/popular?page=${page}`);
      setTvShows({
        tv: data.results,
        total_pages: data.total_pages,
      });
    };
    fetchTvShows();
  }, [page]);

  return { tvShows, page };
};



export default useTvShows;
