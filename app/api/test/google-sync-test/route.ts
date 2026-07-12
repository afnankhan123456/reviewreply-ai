import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('🚀 API /api/test/google-sync-test started...');

  try {
    // 📦 50 DUMMY REVIEWS (Unique googleReviewId)
    const dummyReviews = [
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_1",
        reviewerName: "Aarav Sharma",
        rating: 5,
        comment: "Absolutely loved the service! Will definitely come back.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_2",
        reviewerName: "Priya Patel",
        rating: 5,
        comment: "Best experience ever. Highly recommended to everyone.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_3",
        reviewerName: "Rohit Singh",
        rating: 4,
        comment: "Great ambiance and friendly staff. Food was delicious.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_4",
        reviewerName: "Sneha Kapoor",
        rating: 5,
        comment: "Amazing quality and timely delivery. Very satisfied.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_5",
        reviewerName: "Amit Kumar",
        rating: 4,
        comment: "Good value for money. Will visit again with family.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_6",
        reviewerName: "Neha Jain",
        rating: 5,
        comment: "Very professional and clean environment. Loved it.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_7",
        reviewerName: "Rahul Verma",
        rating: 4,
        comment: "Decent place, good service. Staff was courteous.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_8",
        reviewerName: "Meera Reddy",
        rating: 3,
        comment: "Service was okay, but the waiting time was long.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_9",
        reviewerName: "Ankit Gupta",
        rating: 3,
        comment: "Not bad, not great. Just an average experience.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_10",
        reviewerName: "Pooja Mehta",
        rating: 3,
        comment: "The food was fine but the staff seemed rushed.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_11",
        reviewerName: "Vikram Singh",
        rating: 3,
        comment: "Decent place, but the pricing could be better.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_12",
        reviewerName: "Kavya Nair",
        rating: 3,
        comment: "It was okay. Nothing special, but nothing wrong either.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_13",
        reviewerName: "Rohit Sharma",
        rating: 1,
        comment: "Very bad experience. Will not come again. Service was extremely slow.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_14",
        reviewerName: "Amit Verma",
        rating: 2,
        comment: "Not satisfied with the product quality. Item was damaged.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_15",
        reviewerName: "Sanya Khanna",
        rating: 1,
        comment: "Worst service ever! Staff was very rude.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_16",
        reviewerName: "Karan Joshi",
        rating: 2,
        comment: "Overpriced and not worth the money. Disappointed.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_17",
        reviewerName: "Riya Malhotra",
        rating: 1,
        comment: "Terrible experience. I want a refund.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_18",
        reviewerName: "Gaurav Singh",
        rating: 2,
        comment: "The delivery was delayed by 2 hours. Very frustrating.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_19",
        reviewerName: "Anjali Desai",
        rating: 1,
        comment: "Unprofessional staff and bad quality. Not recommended.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_20",
        reviewerName: "Sneha Patel",
        rating: 5,
        comment: "Absolutely loved the ambiance! Will definitely visit again.",
        source: "google",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_21",
        reviewerName: "Rahul Singh",
        rating: 4,
        comment: "Good value for money. The food was delicious.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_22",
        reviewerName: "Pooja Mehta",
        rating: 3,
        comment: "Service was okay but staff was rude.",
        source: "facebook",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_23",
        reviewerName: "Vikash Yadav",
        rating: 4,
        comment: "Really loved the hospitality. Will recommend to friends.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_24",
        reviewerName: "Shreya Agarwal",
        rating: 5,
        comment: "Best place to hangout. The vibe is amazing.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_25",
        reviewerName: "Rajat Sharma",
        rating: 2,
        comment: "Food was okay but the seating was very uncomfortable.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_26",
        reviewerName: "Priyanka Singh",
        rating: 5,
        comment: "Excellent service and amazing food. Totally worth it.",
        source: "facebook",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_27",
        reviewerName: "Kunal Deshmukh",
        rating: 1,
        comment: "Worst experience ever. Everything was subpar.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_28",
        reviewerName: "Aditya Sharma",
        rating: 5,
        comment: "Excellent service! Very kind and helpful staff.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_29",
        reviewerName: "Ritu Jain",
        rating: 4,
        comment: "Good experience overall. Clean and tidy place.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_30",
        reviewerName: "Sachin Patil",
        rating: 3,
        comment: "Decent place. Nothing special but okay for one visit.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_31",
        reviewerName: "Kiran Shetty",
        rating: 2,
        comment: "Service was slow. Took too long to get our order.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_32",
        reviewerName: "Arjun Nair",
        rating: 1,
        comment: "Worst experience. Would never recommend to anyone.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_33",
        reviewerName: "Nidhi Sharma",
        rating: 5,
        comment: "Absolutely fantastic! Loved every bit of it.",
        source: "facebook",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_34",
        reviewerName: "Manish Kumar",
        rating: 4,
        comment: "Great value for money. Staff was very friendly.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_35",
        reviewerName: "Priti Singh",
        rating: 3,
        comment: "It was okayish. Nothing to complain, nothing to praise.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_36",
        reviewerName: "Ramesh Rao",
        rating: 2,
        comment: "Food was average. Expected better for the price.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_37",
        reviewerName: "Swati Gupta",
        rating: 1,
        comment: "Very rude staff. Did not feel welcome at all.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_38",
        reviewerName: "Akshay Jha",
        rating: 5,
        comment: "Perfect experience. Everything was top notch.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_39",
        reviewerName: "Sonali Mishra",
        rating: 4,
        comment: "Great ambiance and delicious food. Will visit again.",
        source: "facebook",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_40",
        reviewerName: "Pankaj Singh",
        rating: 3,
        comment: "Average experience. Nothing special.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_41",
        reviewerName: "Kavya Reddy",
        rating: 2,
        comment: "Not worth the money. Quality was poor.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_42",
        reviewerName: "Girish Rao",
        rating: 1,
        comment: "Terrible experience. Staff was unprofessional.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_43",
        reviewerName: "Ananya Sharma",
        rating: 5,
        comment: "Excellent service. Very happy with the experience.",
        source: "facebook",
        reviewDate: new Date(),
        replied: true
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_44",
        reviewerName: "Rohit Yadav",
        rating: 4,
        comment: "Good food and friendly atmosphere.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_45",
        reviewerName: "Neha Mehta",
        rating: 3,
        comment: "Decent food but the service was slow.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_46",
        reviewerName: "Vivek Singh",
        rating: 2,
        comment: "Overpriced. Did not meet expectations.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_47",
        reviewerName: "Deepak Kumar",
        rating: 1,
        comment: "Very disappointing experience. I will not come back.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_48",
        reviewerName: "Shubham Jain",
        rating: 5,
        comment: "Everything was perfect. Highly recommended.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_49",
        reviewerName: "Rekha Sharma",
        rating: 4,
        comment: "Nice place. Good food and friendly people.",
        source: "facebook",
        reviewDate: new Date(),
        replied: false
      },
      {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: "google_review_50",
        reviewerName: "Sunil Kumar",
        rating: 3,
        comment: "Average. Nothing to write home about.",
        source: "google",
        reviewDate: new Date(),
        replied: false
      },
    ];

    console.log('✅ 50 Dummy Reviews Generated with unique googleReviewId:', dummyReviews);

    // ✅ DATABASE SAVE LOGIC
    await prisma.review.createMany({ data: dummyReviews });

    console.log('✅ Data saved successfully!');

    return NextResponse.json({ 
      success: true, 
      message: "50 dummy reviews saved to database successfully!",
      count: dummyReviews.length,
      data: dummyReviews
    });

  } catch (error) {
    // ✅ EXACT ERROR LOGGING
    console.error('❌ EXACT ERROR:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
