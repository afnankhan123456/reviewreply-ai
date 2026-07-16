export function getReviewRequestEmailTemplate(name: string, orderId: string, reviewLink: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px;">
      
      <!-- Header -->
      <h2 style="color: #4F46E5; text-align: center;">We value your feedback, ${name}!</h2>

      <!-- Body -->
      <p style="color: #333;">Dear <strong>${name}</strong>,</p>
      <p style="color: #555;">Thank you for choosing us! We would love to hear about your experience with your recent order #${orderId}.</p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${reviewLink}" 
           style="background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Leave a Review
        </a>
      </div>

      <!-- Footer -->
      <p style="color: #999; font-size: 14px; text-align: center;">
        If you didn't request this, please ignore this email.<br>
        Contact us: <a href="mailto:support@reviewreply.com" style="color: #4F46E5;">support@reviewreply.com</a>
      </p>
    </div>
  `;
}
