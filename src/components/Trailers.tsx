import { useTrailers } from "@/hooks";

type TrailersProps = {
  movieId: number;
};

export const Trailers: React.FC<TrailersProps> = ({ movieId }) => {
  const { data, isLoading } = useTrailers(movieId);
  

 

  if (isLoading) {
    return <div>Loading trailers...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No trailers available...</div>;
  }

  const trailers = data.filter((video) => video.type === 'Trailer');
  
  return (
    <div>
      {trailers.map((trailer) => (
        <div key={trailer.id}>
          <iframe
            title={trailer.name}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};

export default Trailers;
