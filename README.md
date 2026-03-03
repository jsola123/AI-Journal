## Link to Prototype
https://ai-journal-jsola2.vercel.app/

## AI Journal
This project is an AI-powered journaling tool that creates unique prompts and reflections based on user input and feedback.
It uses Next.js, tailwind CSS for the frontend, and integrates OpenAI API's gpt-5 mini model on the backend.

## Core features
- AI generated prompts based on moods and topics
- AI reflection to identify central themes based on journal entries
- Local storage

## Overview
- User selects tags for mood and topic in the frontend.
- The frontend sends a request to the backend to generate prompt based on moods and topics selected
- Backend calls OpenAI API
- Response from gpt-5 model returned and displayed to frontend
- User writes a journal entry
- Frontend sends journal entry to backend and calls API to generate the reflection response using both entry input and mood and topic tag inputs

## Design Decisions
- Using tech stack of Next.js (Typescript), Tailwind for fast development and vercel with github for integrated and automatic deployment. 
- Decided to pre-create moods and topics as tags to narrow down choices for the user and reduce decision fatigue of coming up with a prompt.
- I chose the model gpt-5-mini because it balances quality of response with cost. 


## Getting Started

Clone project

Run npm install to install dependencies.  

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



