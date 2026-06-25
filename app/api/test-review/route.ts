import OpenAI from "openai";

export async function GET() {
  try {

    const review =
      "Amazing service and very professional team.";

    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion =
      await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content:
              "You write professional Google review replies.",
          },
          {
            role: "user",
            content: `Reply to this review: ${review}`,
          },
        ],
      });

    return Response.json({
      success: true,
      review,
      reply:
        completion.choices[0].message.content,
    });

  } catch (error: any) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
