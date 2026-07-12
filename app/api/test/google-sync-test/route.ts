import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // 📦 100 DUMMY REVIEWS (WITH UNIQUE googleReviewId)
  const dummyReviews = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const ratings = [5, 4, 3, 2, 1];
    const rating = ratings[Math.floor(Math.random() * ratings.length)];
    const sentiments = rating >= 4 ? 'Positive' : rating >= 3 ? 'Neutral' : 'Negative';
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
      'Vivek Singh', 'Deepak Kumar', 'Shubham Jain', 'Rekha Sharma', 'Sunil Kumar',
      'Anjali Singh', 'Rajan Gupta', 'Meena Rao', 'Ashok Kumar', 'Sita Devi',
      'Gopal Singh', 'Komal Sharma', 'Rahul Jain', 'Pooja Yadav', 'Sanjay Gupta',
      'Kavita Singh', 'Manoj Kumar', 'Ruchi Sharma', 'Vijay Kumar', 'Jyoti Sinha',
      'Ramesh Kumar', 'Neha Singh', 'Amit Sharma', 'Swati Patel', 'Rajesh Kumar',
      'Preeti Singh', 'Suresh Kumar', 'Alok Sharma', 'Rekha Singh', 'Manoj Singh',
      'Gita Devi', 'Ravi Sharma', 'Kiran Patel', 'Sneha Sharma', 'Vikas Gupta',
      'Nisha Singh', 'Raj Singh', 'Anita Sharma', 'Mohan Kumar', 'Shalini Singh',
      'Sagar Sharma', 'Priya Jain', 'Rahul Sharma', 'Geeta Sharma', 'Sunil Singh',
      'Neha Patel', 'Ashok Sharma', 'Anjali Kumar', 'Vishal Singh', 'Nitin Kumar',
      'Ritu Sharma', 'Sonia Gupta', 'Rakesh Sharma', 'Sakshi Singh', 'Rajan Singh'
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
      'Good value for money.', 'Service was okay but staff was rude.',
      'Really loved the hospitality.', 'Best place to hangout.',
      'Food was okay but seating was uncomfortable.', 'Excellent service.',
      'Worst experience ever.', 'Excellent service!', 'Good experience overall.',
      'Decent place.', 'Service was slow.', 'Worst experience.',
      'Absolutely fantastic!', 'Great value for money.', 'It was okayish.',
      'Food was average.', 'Very rude staff.', 'Perfect experience.',
      'Great ambiance and delicious food.', 'Average experience.',
      'Not worth the money.', 'Terrible experience.', 'Excellent service.',
      'Good food and friendly atmosphere.', 'Decent food but service was slow.',
      'Overpriced.', 'Very disappointing experience.', 'Everything was perfect.',
      'Nice place.', 'Average.', 'Not worth the hype.',
      'Never coming back.', 'Absolutely wonderful!', 'Great service.',
      'It was fine.', 'Not up to the mark.', 'Very bad experience.',
      'Amazing experience.', 'Very nice place.', 'Decent.',
      'Could have been better.', 'Very disappointed.', 'Excellent!',
      'Great place.', 'Average.', 'Service was slow and food was cold.',
      'Very rude staff.', 'Brilliant!', 'Very nice ambiance.',
      'Okay experience.', 'Not as expected.', 'Worst service ever.',
      'Absolutely amazing!', 'Very nice.', 'Average.',
      'Could have been better.', 'Very poor quality.', 'Fantastic!',
      'Very good!', 'Decent.', 'Not good.', 'Terrible.',
      'Brilliant!', 'Really good place.', 'It was okay.', 'Not satisfied.',
      'Worst experience ever.', 'Absolutely wonderful!', 'Loved the place!',
      'Decent.', 'Not great.', 'Very disappointing.', 'Excellent!',
      'Great experience!', 'Okay.', 'Not good.', 'Horrible.',
      'Amazing!', 'Very nice place.', 'It was fine.'
    ];
    const comment = comments[i % comments.length];
    const replied = i % 3 === 0;

    return {
      userId: "cmr1wiait0001jv04cbasfye3",
      businessLocationId: null,
      googleReviewId: `google_review_${id}`, // ✅ UNIQUE
      reviewerName: name,
      rating: rating,
      comment: comment,
      source: source,
      reviewDate: new Date(),
      replied: replied
    };
  });

  console.log('✅ 100 Dummy Reviews Generated with unique googleReviewId:', dummyReviews);

  // ✅ DATABASE SAVE LOGIC
  await prisma.review.createMany({ data: dummyReviews });

  return NextResponse.json({ 
    success: true, 
    message: "100 dummy reviews saved to database successfully!",
    count: dummyReviews.length,
    data: dummyReviews
  });
}
