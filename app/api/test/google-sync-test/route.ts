import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  console.log('🚀 API /api/test/google-sync-test started...');

  try {
    // 📦 50 DUMMY REVIEWS (AUTO-GENERATED UNIQUE IDs)
    const dummyReviews = Array.from({ length: 50 }, (_, i) => {
      const id = i + 1;
      const ratings = [5, 4, 3, 2, 1];
      const rating = ratings[Math.floor(Math.random() * ratings.length)];
      const sources = ['google', 'facebook'];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const names = [
        'Aarav Sharma', 'Priya Patel', 'Rohit Singh', 'Sneha Kapoor', 'Amit Kumar',
        'Neha Jain', 'Rahul Verma', 'Meera Reddy', 'Ankit Gupta', 'Pooja Mehta',
        'Vikram Singh', 'Kavya Nair', 'Rohit Sharma', 'Amit Verma', 'Sanya Khanna',
        'Karan Joshi', 'Riya Malhotra', 'Gaurav Singh', 'Anjali Desai', 'Sneha Patel',
        'Rahul Singh', 'Pooja Mehta', 'Vikash Yadav', 'Shreya Agarwal', 'Rajat Sharma',
        'Priyanka Singh', 'Kunal Deshmukh', 'Aditya Sharma', 'Ritu Jain', 'Sachin Patil',
        'Kiran Shetty', 'Arjun Nair', 'Nidhi Sharma', 'Manish Kumar', 'Priti Singh',
        'Ramesh Rao', 'Swati Gupta', 'Akshay Jha', 'Sonali Mishra', 'Pankaj Singh',
        'Kavya Reddy', 'Girish Rao', 'Ananya Sharma', 'Rohit Yadav', 'Neha Mehta',
        'Vivek Singh', 'Deepak Kumar', 'Shubham Jain', 'Rekha Sharma', 'Sunil Kumar'
      ];
      const name = names[i % names.length];
      const comments = [
        'Absolutely loved the service!', 'Best experience ever.', 'Great ambiance.',
        'Amazing quality.', 'Good value for money.', 'Very professional.',
        'Decent place.', 'Service was okay.', 'Not bad, not great.',
        'The food was fine.', 'Decent place.', 'It was okay.',
        'Very bad experience.', 'Not satisfied.', 'Worst service ever!',
        'Overpriced.', 'Terrible experience.', 'The delivery was delayed.',
        'Unprofessional staff.', 'Absolutely loved the ambiance!',
        'Really loved the hospitality.', 'Best place to hangout.',
        'Food was okay but seating was uncomfortable.', 'Excellent service.',
        'Worst experience ever.', 'Excellent service!', 'Good experience overall.'
      ];
      const comment = comments[i % comments.length];
      const replied = i % 3 === 0;

      return {
        userId: "cmr1wiait0001jv04cbasfye3",
        businessLocationId: null,
        googleReviewId: `google_review_${id}`, // ✅ UNIQUE AUTO-GENERATED
        reviewerName: name,
        rating: rating,
        comment: comment,
        source: source,
        reviewDate: new Date(),
        replied: replied
      };
    });

    console.log('✅ 50 Dummy Reviews Generated (Auto-generated unique IDs):', dummyReviews);

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
    console.error('❌ EXACT ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
