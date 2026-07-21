import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const revalidate = 300;

async function getPageData(slug: string) {
  const user = await prisma.user.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });

  if (!user) return null;

  const reviews = await prisma.review.findMany({
    where: { userId: user.id, rating: { gte: 4 } },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      reviewerName: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
  });

  const avgResult = await prisma.review.aggregate({
    where: { userId: user.id },
    _avg: { rating: true },
  });

  const totalCount = await prisma.review.count({ where: { userId: user.id } });

  return {
    businessName: user.name || 'Our Business',
    avgRating: Number((avgResult._avg.rating || 0).toFixed(1)),
    totalCount,
    reviews,
  };
}

export default async function PublicReviewPage({ params }: { params: { slug: string } }) {
  const data = await getPageData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">{data.businessName}</h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-2xl font-bold text-gray-900">{data.avgRating}</span>
            <span className="text-yellow-500 text-xl">
              {'★'.repeat(Math.round(data.avgRating))}
              {'☆'.repeat(5 - Math.round(data.avgRating))}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Based on {data.totalCount} reviews</p>
        </div>

        <div className="space-y-4">
          {data.reviews.length === 0 && (
            <div className="text-center text-gray-500 py-10">No reviews yet.</div>
          )}
          {data.reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{r.reviewerName}</span>
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{r.comment || 'No comment provided.'}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
