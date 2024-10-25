export function ProcessingStep({ progress }: { progress: number }) {
  return (
    <div className="text-center space-y-4">
      <div className="w-full max-w-xs mx-auto space-y-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8B5CF6] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Processing stakeholders...</p>
      </div>
    </div>
  );
}