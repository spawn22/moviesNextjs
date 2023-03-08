import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { TvShowsDetails } from "@/types";
import { useRouter } from "next/router";

const useTvShowsDetailsQuery = () => {
  const router = useRouter();
  const { tvshowid } = router.query;

  return useQuery<TvShowsDetails>(["tvShow", tvshowid], async () => {
    const { data } = await api.get(`/tv/${tvshowid}`);
    console.log(data)
    return data;
  });
};

export default useTvShowsDetailsQuery;
