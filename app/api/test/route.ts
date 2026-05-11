import { ai } from "@/lib/gemini";

export async function GET() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello in one sentence.",
  });

  return Response.json({
    text: response.text,
  });
}