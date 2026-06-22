type Props = {
  review: string;
  reply: string;
};

export default function ReviewCard({
  review,
  reply,
}: Props) {
  return (
    <div className="border p-4 rounded-lg mt-5">
      
      <h2 className="font-bold mb-2">
        Customer Review
      </h2>

      <p className="mb-4">
        {review}
      </p>

      <h2 className="font-bold mb-2">
        AI Reply
      </h2>

      <p>
        {reply}
      </p>

    </div>
  );
}