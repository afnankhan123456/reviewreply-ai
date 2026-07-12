import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy reviews (Token kuch nahi, sirf mock data)
  const dummyReviews = [
    { author: "Test User 1", rating: 5, text: "Great service!", source: "google" },
    { author: "Test User 2", rating: 4, text: "Good experience.", source: "google" },
    { author: "Test User 3", rating: 2, text: "Not satisfied.", source: "google" }
  ];

  console.log('✅ Dummy Data Generated:', dummyReviews);

  // 🔥 YAHAN SAVE KARO DATABASE MEIN
  // await prisma.review.createMany({ data: dummyReviews });

  return NextResponse.json({ 
    success: true, 
    message: "Dummy reviews ready for auto sync test",
    data: dummyReviews
  });
}
