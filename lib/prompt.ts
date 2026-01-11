export function buildJournalPrompt(
  moods: string[],
  topics: string[]
) {
  return `
You are a journaling companion AI. Create a journaling prompt based on the following:

Moods: ${moods.join(", ")}
Topics: ${topics.join(", ")}

Do not give advice. Keep the prompt concise.
`;
}
