import { useTvShowsDetailsQuery } from "@/hooks";
import styles from "../styles/movie.module.css";
import Link from "next/link";
const TvShowsDetails = () => {
  const { data } = useTvShowsDetailsQuery();
  console.log(data);

  if (!data) {
    return <h4>404 - Not Found</h4>;
  }

  return (
    <div className="container mx-auto bg-slate-900 rounded-lg shadow-lg p-8  m-10">
      <Link href="/tvshow">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
      <h2 className={`${styles.fontd} text-yellow-300 `}>{data?.name}</h2>
      <div className="flex items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data?.name}
          className="rounded-lg shadow-md mb-96"
        />
        <div className="ml-10 mb-80   ">
          <p className=" bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Overview: {data?.overview}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Date: {data?.first_air_date}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Number Of Episodes: {data?.number_of_episodes}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Number Of Seasons: {data?.number_of_seasons}
          </p>
          <p className="bg-gray-900 text-gray-50 rounded-lg shadow-lg p-4 m-10">
            Language: {data?.original_language.toUpperCase()}
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
        </div>
      </div>
    </div>
  );
};

export default TvShowsDetails;
