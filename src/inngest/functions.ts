import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const writer = createAgent({
      name: "writer",
      system: "You are an expert writer.  You write readable, concise, simple content.",
      model: openai({ model: "meta-llama/llama-4-scout-17b-16e-instruct", baseUrl: "https://api.groq.com/openai/v1" }),
    });

    const { output } = await writer.run(`Write a short story about this ${event.data.value}`)

    await step.sleep("wait-a-moment", "2s");
    return { message: output };
  },
);
