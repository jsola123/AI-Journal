import { buildJournalReflection } from "@/lib/reflection";
import { openai } from "@/lib/openai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { journalEntry, moods, topics } = await req.json();

        const prompt = buildJournalReflection(journalEntry, moods, topics);

        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: prompt,
        });

        return NextResponse.json({
            prompt: response.output_text,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }

}