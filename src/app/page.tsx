'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC(); 
  const { data } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message created")
    }
  }));

  return (
    <div className="mx-w-7xl mx-auto p-4 flex items-center justify-center">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button disabled={createMessage.isPending} className="cursor-pointer" onClick={() => createMessage.mutate({ value: value })}>
        Invoke function
      </Button>
      {JSON.stringify(data)}
    </div>
  );
}