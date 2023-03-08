import { useQuery } from "react-query";
import { Series } from "@/types/Series";
import { api } from "@/pages/api";



const useSeries = () => {
  return useQuery<Series[]>('popularSeries', async () => {
    const {data} = await api.get('/tv/top_rated');
    return data
  })
};

export default useSeries;
