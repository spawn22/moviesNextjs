import { useReviews } from "@/hooks";

type ReviewsProps = {
  movieId: number;
};

export const Reviews: React.FC<ReviewsProps> = ({ movieId }) => {
  const { data: reviews, isLoading } = useReviews(movieId);

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return <div>No reviews avaliable...</div>;
  }

  return(
      <div>
        <h3 className="text-5xl font-bold mb-4 flex justify-center text-yellow-300">Reviews </h3>
        {reviews.map((review) => (
            <div key={review.id} className="mb-4">
                <h4 className="text-lg font-bold mb-2 text-red-600">{review.author}</h4>
                <p className="text-gray-100">{review.content}</p>
            </div>
        ))}
      </div>

  ) 
};

export default Reviews;
