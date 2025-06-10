import type { CoachReview } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { formatDistanceToNow } from 'date-fns';

interface CoachReviewsSectionProps {
  reviews: CoachReview[];
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export function ReviewCard({ review }: { review: CoachReview }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://picsum.photos/seed/${review.reviewerName}/40/40`} alt={review.reviewerName} data-ai-hint="person avatar"/>
          <AvatarFallback>{getInitials(review.reviewerName)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base">{review.reviewerName}</CardTitle>
          <CardDescription>
            {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review.comment}</p>
      </CardContent>
      <CardFooter className="flex items-center">
        {[...Array(5)].map((_, i) => (
          i < review.rating 
            ? <Icons.starFilled key={i} className="h-5 w-5 text-accent" /> 
            : <Icons.star key={i} className="h-5 w-5 text-accent" />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({review.rating.toFixed(1)})</span>
      </CardFooter>
    </Card>
  );
}


export function CoachReviewsSection({ reviews }: CoachReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Client Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No reviews yet for this coach.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Reviews</CardTitle>
        <CardDescription>What others are saying about this coach.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </CardContent>
    </Card>
  );
}
