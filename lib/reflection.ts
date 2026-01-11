export function buildJournalReflection(
    journalEntry: string,
    moods: string[],
    topics: string[]
) {
    return `
You are a journaling companion AI. Describe a pattern you notice based on the journal entry and selected moods and topics below:

Journal Entry: ${journalEntry}

Moods: ${moods.join(", ")}
Topics: ${topics.join(", ")}

Do not give advice unless asked but be compassionate.
`;
}
