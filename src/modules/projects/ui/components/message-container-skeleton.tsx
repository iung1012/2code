import { Skeleton } from "@/components/ui/skeleton";

export default function MessageContainerSkeleton() {
    return (
        <div className="flex flex-col flex-1 min-h-0 px-2">
            <div className="pt-2 pr-1">
                <Skeleton className="w-full h-10" />
            </div>
        </div>
    );
}