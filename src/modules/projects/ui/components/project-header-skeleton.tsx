import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectHeaderSkeleton() {
    return (
        <div className="p-2 flex justify-between items-center border-b">
            <Skeleton className="h-8 rounded-md gap-1.5 px-3 w-[250px]" />
        </div>  
    );
}