import { buildJournalReflection } from "@/lib/reflection";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { journalEntry, moods, topics } = await req.json();

  const prompt = buildJournalReflection(journalEntry, moods, topics);

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return Response.json({
    prompt: response.output_text,
  });
}