import { useState } from "react";
import renderStars from "../utils/renderStars";
import styles from "./../styles/movie.module.css";
import Link from "next/link";
import {
  useMoviesQuery,
  useSearchQuery,
  useGenres,
  useDiscoverGenres,
} from "@/hooks";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres: string[];
};

const Movies = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);

  const { data: moviesData } = useMoviesQuery(page);
  const { data: genresData } = useGenres();
  const { data: searchData } = useSearchQuery(query, page);
  
  const filteredMovies = useDiscoverGenres(
    selectedGenre[0] || 0,
    page
  )?.dataDiscover?.movies.filter(
    (movie) =>
      selectedGenre.length === 0 || // check if no genres are selected
      movie.genre_ids.some((genreId) => selectedGenre.includes(genreId))
  );
  
  const data = query ? searchData?.movies : filteredMovies;
    
  console.log(searchData)

  const genres = genresData?.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {} as { [id: number]: string });

  let pageNumberArray: number[] = [];
  if (data) {
    const total_pages = query
      ? searchData?.total_pages
      : moviesData?.total_pages;
    const start = Math.max(1, page - 4);
    const end = Math.min(
      start + 8,
      total_pages !== undefined ? total_pages : 0
    );
    pageNumberArray = [...Array(end - start + 1)].map((_, i) => i + start);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleGenreClick = (genreId: number) => {
    if (selectedGenre.includes(genreId)) {
      setSelectedGenre(selectedGenre.filter((id) => id !== genreId));
    } else {
      setSelectedGenre([...selectedGenre, genreId]);
    }
    setPage(1);
  };

  

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className="flex justify-center gap-10 mb-4 mt-4">
          <input
            type="text"
            placeholder="Search movies"
            value={query}
            onChange={handleSearchChange}
            className="border-2 border-gray-400 rounded px-10 py-1  "
          />
        </div>
      </form>
      <div className="flex gap-4 mb-4">
        {genres &&
          Object.entries(genres).map(([id, name]) => (
            <button
              key={id}
              onClick={() => handleGenreClick(parseInt(id))}
              className={`${
                selectedGenre.includes(parseInt(id))
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } px-4 py-1 border-2 border-blue-500 rounded`}
            >
              {name}
            </button>
          ))}
      </div>  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data?.map((movie) => (
          <div key={movie.id} className="bg-black shadow overflow-hidden">
            <Link href={`movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width="500"
                height="500"
              />
            </Link>
            <div className="bg-black">
              <h2 className={styles.font}>{movie.title}</h2>
              <p className="text-gray-300 text-sm">
                {movie.original_language.toUpperCase()} | {movie.release_date}
              </p>
              <div className="flex items-center">
                <div>{renderStars(movie.vote_average)}</div>
                <span className="text-yellow-500 text-sm ml-2 ">
                  {movie.vote_average}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumberArray.slice(0, 10).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${
              page + 1 === page
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } px-4 py-1 border-2 border-blue-500 mr-2 rounded`}
          >
            {page}
          </button>
        ))}
        {pageNumberArray.length > 10 && (
          <button
            onClick={() => handlePageChange(11)}
            className={`${
              11 === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            } px-4 py-1 border-2 border-blue-500 mr-2 rounded`}
          >
            ...
          </button>
        )}
      </div>
    </div>
  );
};
export default Movies;
