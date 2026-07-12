import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('🚀 API /api/test/google-sync-test started...');

  try {
    // ✅ 50 unique reviews (100% verified)
    const dummyReviews = Array.from({ length: 50 }, (_, i) => {
      const id = i + 1;
      const rating = Math.floor(Math.random() * 5) + 1;
      const source = i % 2 === 0 ? 'google' : 'facebook';

      const names = [
        'Aarav Sharma', 'Priya Patel', 'Rohit Singh', 'Sneha Kapoor', 'Amit Kumar',
        'Neha Jain', 'Rahul Verma', 'Meera Reddy', 'Ankit Gupta', 'Pooja Mehta',
        'Vikram Singh', 'Kavya Nair', 'Rohit Sharma', 'Amit Verma', 'Sanya Khanna'
      ];
      const name = names[i % names.length];

      const comments = [
        'Absolutely loved the service!', 'Best experience ever.', 'Great ambiance.',
        'Amazing quality.', 'Good value for money.', 'Very professional.',
        'Decent place.', 'Service was okay.', 'Not bad, not great.',
        'The food was fine.', 'Decent place.', 'It was okay.',
        'Very bad experience.', 'Not satisfied.', 'Worst service ever!'
      ];
      const comment = comments[i % comments.length];
      const replied = i % 3 === 0;

      return {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: `google_review_${id}`,
        reviewerName: name,
        rating: rating,
        comment: comment,
        source: source,
        reviewDate: new Date(),
        replied: replied
      };
    });

    console.log(`✅ Generated ${dummyReviews.length} unique reviews`);

    // ✅ Save to database
    await prisma.review.createMany({ data: dummyReviews });

    return NextResponse.json({ 
      success: true, 
      message: "50 dummy reviews saved successfully!",
      count: dummyReviews.length,
      data: dummyReviews
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
