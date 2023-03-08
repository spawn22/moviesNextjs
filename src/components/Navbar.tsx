import { useState, useEffect } from "react";
import { useTopRated, useGenres } from "@/hooks";
import Link from "next/link";

const Navbar = () => {
  const [isTopRatedOpen, setIsTopRatedOpen] = useState(false);

  const { data: movies } = useTopRated();

  const toggleTopRated = () => setIsTopRatedOpen(!isTopRatedOpen);

  if (!movies) {
    return <p>Error...</p>;
  }

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
      <div className="flex items-center">
        {movies && movies.length > 0 && (
          <div className="relative">
            <button
              className="ml-4 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={toggleTopRated}
            >
              Top Rated Movies
            </button>
            {isTopRatedOpen && (
              <div className="absolute top-10 right-0 bg-gray-800 p-4 rounded-md">
                <ul>
                  {movies?.map((movie) => (
                    <li key={movie.id} className="mb-2 p-0.5">
                      <Link href={`/movie/${movie.id}`}>
                        <span>{movie.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <Link href="/tvshow">
            <button className="ml-96 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Popular Series
              </button>
            </Link>
      </div>
    </nav>
  );
};

export default Navbar;
