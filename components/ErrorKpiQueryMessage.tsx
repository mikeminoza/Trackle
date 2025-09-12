import { AlertCircle } from "lucide-react";

export default function ErrorKpiQueryMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-3">
      <div className="flex items-center justify-center rounded-full">
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>
      <h2 className="text-2xl font-bold">Failed to load KPI summary</h2>
      <p className="text-sm text-muted-foreground">There was an error fetching your budget KPIs.</p>
    </div>
  );
}
