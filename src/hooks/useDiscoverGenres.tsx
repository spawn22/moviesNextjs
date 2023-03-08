// import { useQuery } from "react-query"
// import { api } from "@/pages/api"
// import { Movie } from "@/components/Movies"

// type DiscoverData = {
//     movies: Movie[];
//     total_pages: number;
// }

// const useDiscoverGenres = (genreId: number, page: number) => {
//   return useQuery<DiscoverData>(
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

// export default useDiscoverGenres
import { useEffect, useState } from "react";
import { api } from "@/pages/api";
import { Movie } from "@/components/Movies";

type DiscoverData = {
  movies: Movie[];
  total_pages: number;
};

const useDiscoverGenres = (genreId: number | null, page: number) => {
  const [dataDiscover, setDataDiscover] = useState<DiscoverData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/discover/movie";
        let params: any = { page };

        if (genreId) {
          params.with_genres = genreId;
        }

        const { data } = await api.get(url, { params });
        setDataDiscover({
          movies: data.results,
          total_pages: data.total_pages,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [genreId, page]);

  return { dataDiscover };
};

export default useDiscoverGenres;
