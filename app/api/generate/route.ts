import { buildJournalPrompt } from "@/lib/prompt";
import { openai } from "@/lib/openai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    try {
        const { moods, topics } = await req.json();
        console.log("Received moods/topics:", moods, topics);

        const prompt = buildJournalPrompt(moods, topics);
        console.log("Built prompt:", prompt);

        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: prompt,
        });

        console.log("OpenAI response:", response);

        return NextResponse.json({
            prompt: response.output_text,
        });

    } catch (error) {
        console.log("straight to Error in /api/generate:", error);
        console.error(error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }

}
