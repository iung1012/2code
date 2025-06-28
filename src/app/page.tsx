import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import Client from "./Client";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "PREFETCH" }));

  return (
    <HydrationBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <Client />
        </Suspense>
    </HydrationBoundary>
  );
}