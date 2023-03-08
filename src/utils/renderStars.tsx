const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const hasHalfStar = score % 2 !== 0;
  
    return (
      <div>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-star-${i}`} aria-label="Full star" role="img">
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span aria-label="Half star" role="img">
            ☆
          </span>
        )}
      </div>
    );
  };

  export default renderStars