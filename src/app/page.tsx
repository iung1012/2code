'use client'

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC(); 
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job started")
    }
  }));

  return (
    <div className="mx-w-7xl mx-auto p-4 flex items-center justify-center">
      <Button disabled={invoke.isPending} className="cursor-pointer" onClick={() => invoke.mutate({ text: "someone" })}>
        Invoke function
      </Button>
    </div>
  );
}