import { NextRequest } from "next/server";

import { ai } from "@/lib/gemini";

export async function POST(
  req: NextRequest
) {
  const { prompt } =
    await req.json();

  const encoder =
    new TextEncoder();

  const stream =
    new ReadableStream({
      async start(controller) {
        try {
          const response =
            await ai.models.generateContentStream(
              {
                model:
                  "gemini-2.5-flash",

                contents: prompt,

                config: {
                  temperature: 0.7,
                },
              }
            );

          let tokenIndex = 0;

          for await (const chunk of response) {
            const text =
              chunk.text || "";

            let entropy = 0;

            /**
             * Simulated entropy patterns
             * layered on top of
             * real streaming output.
             */

            if (
              prompt
                .toLowerCase()
                .includes("math")
            ) {
              entropy =
                0.8 +
                Math.random() * 1.2;
            } else if (
              prompt
                .toLowerCase()
                .includes(
                  "history"
                )
            ) {
              entropy =
                0.2 +
                Math.random() * 0.5;
            } else if (
              prompt
                .toLowerCase()
                .includes(
                  "quantum"
                )
            ) {
              entropy =
                0.6 +
                Math.random() * 1.0;
            } else {
              entropy =
                Math.random() * 2;
            }

            const payload = {
              token: text,

              entropy,

              confidence: 1,

              tokenIndex,
            };

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify(
                  payload
                )}\n\n`
              )
            );

            tokenIndex++;
          }

          controller.close();
        } catch (error) {
          console.error(error);

          /**
           * Fallback response
           * if quota fails.
           */

          const fallback =
            "Live model unavailable. Running simulated observability mode.";

          const words =
            fallback.split(" ");

          let tokenIndex = 0;

          for (const word of words) {
            const payload = {
              token: word + " ",

              entropy:
                Math.random() * 2,

              confidence: 1,

              tokenIndex,
            };

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify(
                  payload
                )}\n\n`
              )
            );

            tokenIndex++;

            await new Promise(
              (resolve) =>
                setTimeout(
                  resolve,
                  100
                )
            );
          }

          controller.close();
        }
      },
    });

  return new Response(stream, {
    headers: {
      "Content-Type":
        "text/event-stream",

      "Cache-Control":
        "no-cache",

      Connection:
        "keep-alive",
    },
  });
}