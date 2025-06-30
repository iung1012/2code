export default async function Page({ 
    params,
}: {
    params: Promise<{ projectId: string }>
}) {
    const { projectId } = await params; 
    return (
        <div>Project ID: {projectId}</div>
    );
}