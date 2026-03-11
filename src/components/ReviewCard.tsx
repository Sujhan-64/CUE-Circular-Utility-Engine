import RatingStars from "./RatingStars";

interface ReviewCardProps {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard = ({ userName, rating, comment, date }: ReviewCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-semibold text-secondary-foreground">{userName[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
        <RatingStars rating={rating} size={12} />
      </div>
      <p className="text-sm text-muted-foreground font-serif leading-relaxed">{comment}</p>
    </div>
  );
};

export default ReviewCard;
