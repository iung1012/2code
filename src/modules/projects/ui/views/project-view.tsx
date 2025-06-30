'use client'

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import MessagesContainer from "../components/messages-container";
import { Suspense } from "react";

interface Props {
    projectId: string
}

export default function ProjectView({ projectId }: Props) {
    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0"    
                >
                    <Suspense fallback={<p>Loading messages</p>}>
                        <MessagesContainer projectId={projectId} />
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={65}
                    minSize={50}
                >
                    <Suspense fallback={<p>Loading messages</p>}>
                        TODO: WEB PREVIEW HERE
                    </Suspense>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}