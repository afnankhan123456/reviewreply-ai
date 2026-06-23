type Props = {
  name: string;
  review: string;
  status: string;
  reply: string;
};

export default function ReviewCard({
  name,
  review,
  status,
  reply,
}: Props) {
  return (
    <div className="border p-4 rounded-lg mt-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">
          {name}
        </h2>

        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
          {status}
        </span>
      </div>

      <h3 className="font-semibold mb-1">
        Customer Review
      </h3>

      <p className="mb-4">
        {review}
      </p>

      <h3 className="font-semibold mb-1">
        AI Reply
      </h3>

      <p>
        {reply}
      </p>
    </div>
  );
}






