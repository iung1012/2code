import Hints from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";


export default function FragmentWeb({ data }: { data: Fragment }) {
    const [fragmentKey, setFragmentKey] = useState(0);
    const [copied, setCopied] = useState(false);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hints text="Refresh" side="bottom" align="start">
                    <Button size="sm" variant="outline" onClick={onRefresh}>
                        <RefreshCcwIcon />
                    </Button>
                </Hints>
                <Button
                    className="flex-1 justify-start text-start font-normal"
                    disabled={!data.sandboxUrl || copied}
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                >
                    <span className="truncate">{data.sandboxUrl}</span>
                </Button>
                <Hints text="Open in a new tab" side="bottom" align="start">
                    <Button
                        size="sm"
                        disabled={!data.sandboxUrl}
                        variant="outline"
                        onClick={() => {
                            if (!data.sandboxUrl) return;
                            window.open(data.sandboxUrl, "_blank");
                        }}
                    >
                        <ExternalLinkIcon />
                    </Button>
                </Hints>

            </div>
            <iframe
                key={fragmentKey}
                className="h-full w-full"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={data.sandboxUrl}
            />
        </div>
    );
}