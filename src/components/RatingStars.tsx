import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

const RatingStars = ({ rating, size = 14, showValue = false, reviewCount }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.floor(rating)
              ? "fill-foreground text-foreground"
              : star <= rating
              ? "fill-foreground/50 text-foreground/50"
              : "text-border"
          }
        />
      ))}
      {showValue && <span className="text-sm text-muted-foreground ml-1">{rating}</span>}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
};

export default RatingStars;
