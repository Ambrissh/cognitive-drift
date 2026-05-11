"use client";

import { useState } from "react";

import EntropyGraph from "@/components/EntropyGraph";
import StabilityBadge from "@/components/StabilityBadge";

export default function Home() {
  const [prompt, setPrompt] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [graphData, setGraphData] =
    useState<
      {
        tokenIndex: number;
        entropy: number;
      }[]
    >([]);

  const [status, setStatus] =
    useState("Stable");

  async function runPrompt() {
    setOutput("");
    setGraphData([]);
    setStatus("Stable");

    const response = await fetch(
      "/api/stream",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      }
    );

    if (!response.body) return;

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    while (true) {
      const { done, value } =
        await reader.read();

      if (done) break;

      const chunk =
        decoder.decode(value);

      const lines = chunk
        .split("\n")
        .filter((line) =>
          line.startsWith("data:")
        );

      for (const line of lines) {
        const json = line.replace(
          "data: ",
          ""
        );

        try {
          const parsed =
            JSON.parse(json);

          setOutput(
            (prev) =>
              prev + parsed.token
          );

          setGraphData((prev) => [
            ...prev,
            {
              tokenIndex:
                prev.length,

              entropy:
                parsed.entropy,
            },
          ]);

          if (
            parsed.entropy < 0.7
          ) {
            setStatus("Stable");
          } else if (
            parsed.entropy < 1.3
          ) {
            setStatus("Drifting");
          } else {
            setStatus("Unstable");
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-6xl font-bold tracking-tight">
            Cognitive Drift
          </h1>

          <p className="max-w-3xl text-lg text-zinc-400">
            Real-time observability
            for LLM uncertainty,
            reasoning instability,
            and hallucination-risk
            visualization.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Prompt
          </p>

          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(
                e.target.value
              )
            }
            placeholder="Ask anything..."
            className="h-40 w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none"
          />

          <button
            onClick={runPrompt}
            className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            Analyze Drift
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Streaming Output
                </h2>

                <p className="text-sm text-zinc-500">
                  Tokens analyzed:
                  {" "}
                  {
                    graphData.length
                  }
                </p>
              </div>

              <div className="min-h-[300px] whitespace-pre-wrap text-zinc-200 leading-7">
                {output}
              </div>
            </div>

            <EntropyGraph
              data={graphData}
            />
          </div>

          <div className="space-y-6">
            <StabilityBadge
              status={status}
            />

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
              <h3 className="text-lg font-semibold">
                What is happening?
              </h3>

              <p className="text-sm leading-6 text-zinc-400">
                Cognitive Drift
                visualizes model
                uncertainty during
                generation.
              </p>

              <p className="text-sm leading-6 text-zinc-400">
                Higher entropy spikes
                indicate increased
                uncertainty or unstable
                reasoning trajectories.
              </p>

              <p className="text-sm leading-6 text-zinc-400">
                Stable low-entropy
                regions suggest more
                confident generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}