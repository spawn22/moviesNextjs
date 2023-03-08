import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { api } from "@/pages/api";
import styles from "./../styles/movie.module.css";
import Trailers from "./Trailers";
import Reviews from "./Reviews";
import Link from "next/link";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  vote_average: string;
  overview: string;
  genres: [];
}

function MovieDetails() {
  const router = useRouter();
  const { movieId } = router.query;

  const { data, isLoading, isError } = useQuery<Movie>(
    ["movie", movieId],
    async () => {
      const { data } = await api.get(`/movie/${movieId}`);

      return data;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (!data) {
    return <h4>404 - Not Found</h4>;
  }

  return (
    <div className="container mx-auto bg-slate-900 rounded-lg shadow-lg p-8  m-10">
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
      <h2 className={`${styles.fontd} text-yellow-300 `}>{data.title}</h2>
      <div className="flex items-start ">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          className=" rounded-lg shadow-md mb-96"
        />
        <div className="ml-10 mb-80   ">
          <p className=" bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            {data.overview}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Date: {data.release_date}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Language: {data.original_language.toUpperCase()}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10 ">
            Rating: {parseFloat(data.vote_average).toFixed(1)} / 10
          </p>
          <div className=" bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Genres:
            {data.genres.map((genre: { name: string; id: number }) => (
              <span key={genre.id} className="ml-1 mt-10">
                {genre.name},
              </span>
            ))}
          </div>
          <div className=" bg-gray-900 text-gray-50 rounded-lg shadow-lg p-8 m-10">
            <Trailers movieId={data.id} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Reviews movieId={data.id} />
      </div>
    </div>
  );
}

export default MovieDetails;
