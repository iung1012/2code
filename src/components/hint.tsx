'use client'

import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface HintProps {
    children: React.ReactNode, 
    text: string, 
    side?: "top" | "right" | "bottom" | "left", 
    align?: "start" | "center" | "end"
}

export default function Hints({
    children, 
    text, 
    side, 
    align
}: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}