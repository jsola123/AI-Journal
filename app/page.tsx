'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";




const moods = ["Happy", "Grateful", "Hopeful", "Playful", "Optimistic", "Peaceful", "Lonely", "Sad", "Uncertain", "Anxious", "Excited", "Angry"];
const topics = ["Family", "Work", "School", "Friends", "Partner", "Finances", "Milestones", "Relationships", "Health", "Hobbies", "Travel"];


export default function Home() {
  const [selected, setSelected] = useState<{ moods: string[], topics: string[] }>({
    moods: [],
    topics: [],
  })

  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [reflection, setReflection] = useState<string | null>(null);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [loadingReflection, setLoadingReflection] = useState(false);


  function toggleSelect(tag: 'moods' | 'topics', value: string) {
    setSelected((curr) => {
      const isSelected = curr[tag].includes(value);
      if (isSelected) {
        return {
          ...curr,
          [tag]: curr[tag].filter((item) => item !== value),
        };
      } else {
        return {
          ...curr,
          [tag]: [...curr[tag], value],
        };
      }
    });

  }

  async function handleGeneratePrompt() {
    setLoadingPrompt(true);
    console.log("Sending moods:", selected.moods, "topics:", selected.topics);


    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moods: selected.moods,
        topics: selected.topics,
      }),
    });

    const data = await res.json();

    setPrompt(data.prompt);
    setLoadingPrompt(false);
  }

  async function handleGenerateReflection() {
    setLoadingReflection(true);

    const res = await fetch("/api/reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        journalEntry: entry,
        moods: selected.moods,
        topics: selected.topics,
      }),
    });

    const data = await res.json();

    setReflection(data.prompt);
    setLoadingReflection(false);
  }

  return (
    <div className="flex flex-col w-full max-w-5xl min-h-screen p-20 mx-auto mt-15">
      <div className="font-serif text-center mb-10">
        <h1 className="text-3xl italic p-5 font-bold">What's on your mind today?</h1>
        <p className="text-xl font-medium">Need help choosing a prompt? Select tags for mood and topic below.</p>
      </div>


      <div className="flex flex-col p-5 gap-10">
        <div className="mb-5">
          <h3 className="ml-1">
            Mood:
          </h3>
          {moods.map((mood) => {
            const isSelected = selected.moods.includes(mood);
            return (
              <Badge
                key={mood}
                onClick={() => toggleSelect('moods', mood)}
                className={`m-1 px-5 text-sm drop-shadow-sm select-none hover:bg-[#d6ebff] ${isSelected ? "bg-secondary-foreground" : "bg-primary"}`}
              >
                {mood}

              </Badge>

            );


          })}
        </div>
        <div className="">
          <h3 className="ml-1">
            Topics:
          </h3>
          {topics.map((topic) => {
            const isSelected = selected.topics.includes(topic);
            return (
              <Badge
                key={topic}
                onClick={() => toggleSelect('topics', topic)}
                className={`m-1 px-5  text-sm drop-shadow-sm select-none hover:bg-muted ${isSelected ? "bg-secondary-foreground" : "bg-primary"}`}
              >
                {topic}

              </Badge>

            );


          })}
        </div>
        <Button
          onClick={handleGeneratePrompt}
          disabled={loadingPrompt}
          className="w-1/4 mx-auto rounded-full font-semibold"
        >
          {loadingPrompt ? "Generating..." : "Generate Prompt"}
        </Button>
        {prompt && (
          <div className="mt-8 p-6 rounded-xl border-3 border-primary">
            <h3 className="font-semibold text-lg mb-2">Your Prompt</h3>
            <p>{prompt}</p>
          </div>
        )}


      </div>

      <div className="flex flex-col justify-center items-center w-full mt-10 gap-5 p-5">
        <h3 className="text-2xl font-serif">Write your journal entry below:</h3>
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your journal entry here..."
          className="bg-white min-h-[500px] w-full"
        />
        <Button
          onClick={handleGenerateReflection}
          disabled={loadingReflection}
          className="w-1/4 rounded-full font-semibold"
        >
          {loadingReflection ? "Creating..." : "Create Reflection"}
        </Button>
        {reflection && (
          <div className="mt-8 p-6 rounded-xl border-3 border-primary w-full">
            <h3 className="font-semibold text-lg mb-2">Your Reflection</h3>
            <p>{reflection}</p>
          </div>
        )}
      </div>



    </div>
  );
}
