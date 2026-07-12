import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // 📦 DUMMY DATA WITH ALL REQUIRED FIELDS FOR PRISMA
  const dummyReviews = [
    // Positive Reviews
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Aarav Sharma",
      rating: 5,
      comment: "Absolutely loved the service! Will definitely come back.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Priya Patel",
      rating: 5,
      comment: "Best experience ever. Highly recommended to everyone.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Rohit Singh",
      rating: 4,
      comment: "Great ambiance and friendly staff. Food was delicious.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Sneha Kapoor",
      rating: 5,
      comment: "Amazing quality and timely delivery. Very satisfied.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Amit Kumar",
      rating: 4,
      comment: "Good value for money. Will visit again with family.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Neha Jain",
      rating: 5,
      comment: "Very professional and clean environment. Loved it.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Rahul Verma",
      rating: 4,
      comment: "Decent place, good service. Staff was courteous.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    
    // Neutral Reviews
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Meera Reddy",
      rating: 3,
      comment: "Service was okay, but the waiting time was long.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Ankit Gupta",
      rating: 3,
      comment: "Not bad, not great. Just an average experience.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Pooja Mehta",
      rating: 3,
      comment: "The food was fine but the staff seemed rushed.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Vikram Singh",
      rating: 3,
      comment: "Decent place, but the pricing could be better.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Kavya Nair",
      rating: 3,
      comment: "It was okay. Nothing special, but nothing wrong either.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },

    // Negative Reviews
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Rohit Sharma",
      rating: 1,
      comment: "Very bad experience. Will not come again. Service was extremely slow.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Amit Verma",
      rating: 2,
      comment: "Not satisfied with the product quality. Item was damaged.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Sanya Khanna",
      rating: 1,
      comment: "Worst service ever! Staff was very rude.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Karan Joshi",
      rating: 2,
      comment: "Overpriced and not worth the money. Disappointed.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Riya Malhotra",
      rating: 1,
      comment: "Terrible experience. I want a refund.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Gaurav Singh",
      rating: 2,
      comment: "The delivery was delayed by 2 hours. Very frustrating.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Anjali Desai",
      rating: 1,
      comment: "Unprofessional staff and bad quality. Not recommended.",
      source: "facebook",
      reviewDate: new Date(),
      replied: false
    },
    
    // Unanswered / Replied mix
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Sneha Patel",
      rating: 5,
      comment: "Absolutely loved the ambiance! Will definitely visit again.",
      source: "google",
      reviewDate: new Date(),
      replied: true
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_google_1",
      reviewerName: "Rahul Singh",
      rating: 4,
      comment: "Good value for money. The food was delicious.",
      source: "google",
      reviewDate: new Date(),
      replied: false
    },
    {
      userId: "test_user_1",
      businessLocationId: "loc_fb_1",
      reviewerName: "Pooja Mehta",
      rating: 3,
      comment: "Service was okay but staff was rude.",
      source: "facebook",
      reviewDate: new Date(),
      replied: true
    },
  ];

  console.log('✅ 22 Dummy Reviews Generated with valid Prisma fields:', dummyReviews);

  // ✅ DATABASE SAVE LOGIC
  await prisma.review.createMany({ data: dummyReviews });

  return NextResponse.json({ 
    success: true, 
    message: "22 dummy reviews saved to database successfully!",
    count: dummyReviews.length,
    data: dummyReviews
  });
}
