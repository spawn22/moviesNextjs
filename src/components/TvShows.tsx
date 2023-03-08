    import { useState } from "react";
    import { useTvShows, useTvShowsSearch } from "@/hooks";
    import styles from "../styles/movie.module.css";
    import { renderStars } from "@/utils";
    import Link from "next/link";



    const TvShows = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const { tvShows } = useTvShows(page);
    const { data: searchTv } = useTvShowsSearch(query);

    const data = query ? searchTv : tvShows;

    let pageNumberArray: number[] = [];
    if (data && data.tv.length > 0) {
        const total_pages = query ? searchTv?.total_pages : tvShows?.total_pages;
        const start = Math.max(1, page - 4);
        const end = Math.min(
        start + 8,
        total_pages !== undefined ? total_pages : 0
        );
        pageNumberArray = [...Array(end - start + 1)].map((_, i) => i + start);
    }

    const handlePageChange = (page: number) => {
        setPage(page);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPage(1);
    };

    return (
        <div>
            <Link href="/">
            <button className="border-2 border-gray-400 rounded px-10 py-1 mt-5">
                Back
            </button>
            
            </Link>
        <form onSubmit={handleSearchSubmit}>
            <div className="flex justify-center gap-10 mb-4 mt-4">
            <input
                type="text"
                placeholder="Search Series"
                value={query}
                onChange={handleSearchChange}
                className="border-2 border-gray-400 rounded px-10 py-1  "
            />
            </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.tv.map((tvShow) => (
            <div key={tvShow.id} className="bg-black shadow overflow-hidden">
                <Link href={`/tvshow/${tvShow.id}`}>
                <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={`${tvShow.name} poster`}
                width="500"
                height="500"
                />
                </Link>
                <div className="bg-black">
                <h3 className={styles.font}>{tvShow.name}</h3>
                <p className="text-gray-300 text-sm">
                    {tvShow.original_language.toLocaleUpperCase()}
                </p>
                <div className="flex items-center">
                    <div>{renderStars(tvShow.vote_average)}</div>
                    <span className="text-yellow-500 text-sm ml-2 ">
                    {tvShow.vote_average}
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

    export default TvShows;
