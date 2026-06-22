import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You write short professional Google review replies.",
          },
          {
            role: "user",
            content: `Reply to this review: ${body.review}`,
          },
        ],
      });

    return Response.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {
    return Response.json({
      error: "Something went wrong",
    });
  }
}