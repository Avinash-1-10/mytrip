import { Star, StarBorder, StarHalf } from "@mui/icons-material";

const Rating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} sx={{ color: "gold" }} />
        ))}
        {hasHalfStar && <StarHalf sx={{ color: "gold" }} />}
        {[...Array(remainingStars)].map((_, index) => (
          <StarBorder key={index} sx={{ color: "gold" }} />
        ))}
      </>
    );
  };


  export default Rating;