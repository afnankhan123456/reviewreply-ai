import { NextResponse } from 'next/server';

export async function GET() {
  // 📦 MORE DUMMY DATA (20+ reviews with different statuses, sources, sentiments)
  const dummyReviews = [
    // Positive Reviews
    { author: "Aarav Sharma", rating: 5, text: "Absolutely loved the service! Will definitely come back.", source: "google" },
    { author: "Priya Patel", rating: 5, text: "Best experience ever. Highly recommended to everyone.", source: "facebook" },
    { author: "Rohit Singh", rating: 4, text: "Great ambiance and friendly staff. Food was delicious.", source: "google" },
    { author: "Sneha Kapoor", rating: 5, text: "Amazing quality and timely delivery. Very satisfied.", source: "google" },
    { author: "Amit Kumar", rating: 4, text: "Good value for money. Will visit again with family.", source: "facebook" },
    { author: "Neha Jain", rating: 5, text: "Very professional and clean environment. Loved it.", source: "google" },
    { author: "Rahul Verma", rating: 4, text: "Decent place, good service. Staff was courteous.", source: "facebook" },
    
    // Neutral Reviews
    { author: "Meera Reddy", rating: 3, text: "Service was okay, but the waiting time was long.", source: "google" },
    { author: "Ankit Gupta", rating: 3, text: "Not bad, not great. Just an average experience.", source: "facebook" },
    { author: "Pooja Mehta", rating: 3, text: "The food was fine but the staff seemed rushed.", source: "google" },
    { author: "Vikram Singh", rating: 3, text: "Decent place, but the pricing could be better.", source: "facebook" },
    { author: "Kavya Nair", rating: 3, text: "It was okay. Nothing special, but nothing wrong either.", source: "google" },

    // Negative Reviews
    { author: "Rohit Sharma", rating: 1, text: "Very bad experience. Will not come again. Service was extremely slow.", source: "google" },
    { author: "Amit Verma", rating: 2, text: "Not satisfied with the product quality. Item was damaged.", source: "google" },
    { author: "Sanya Khanna", rating: 1, text: "Worst service ever! Staff was very rude.", source: "facebook" },
    { author: "Karan Joshi", rating: 2, text: "Overpriced and not worth the money. Disappointed.", source: "google" },
    { author: "Riya Malhotra", rating: 1, text: "Terrible experience. I want a refund.", source: "facebook" },
    { author: "Gaurav Singh", rating: 2, text: "The delivery was delayed by 2 hours. Very frustrating.", source: "google" },
    { author: "Anjali Desai", rating: 1, text: "Unprofessional staff and bad quality. Not recommended.", source: "facebook" },
    
    // Unanswered / Replied mix
    { author: "Sneha Patel", rating: 5, text: "Absolutely loved the ambiance! Will definitely visit again.", source: "google", replied: true },
    { author: "Rahul Singh", rating: 4, text: "Good value for money. The food was delicious.", source: "google", replied: false },
    { author: "Pooja Mehta", rating: 3, text: "Service was okay but staff was rude.", source: "facebook", replied: true },
  ];

  console.log('✅ 20+ Dummy Reviews Generated:', dummyReviews);

  // 🔥 DATABASE SAVE LOGIC (Uncomment when ready)
  // await prisma.review.createMany({ data: dummyReviews });

  return NextResponse.json({ 
    success: true, 
    message: "20+ dummy reviews ready for auto sync test",
    count: dummyReviews.length,
    data: dummyReviews
  });
}
