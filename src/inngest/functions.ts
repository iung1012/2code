import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // dummy process 1 (script planning)
    await step.sleep("wait-a-moment", "10s");

    // dummy process 2 (voiceover writing)
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.mail}!` };
  },
);
