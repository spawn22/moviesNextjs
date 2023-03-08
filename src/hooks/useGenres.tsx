import { useQuery } from "react-query";
import { api } from "@/pages/api";
import { Genre } from "@/types";

type GenreData = {
  map(arg0: (genre: any) => JSX.Element): import("react").ReactNode;
  length: number;
  genres: Genre[];
};

const useGenres = () => {
  return useQuery<GenreData>(["genres"], async () => {
    const { data } = await api.get("/genre/movie/list");
    return data;
  });
};

export default useGenres;
