interface Props {
    status: string;
  }
  
  export default function StabilityBadge({
    status,
  }: Props) {
    let color =
      "bg-green-500/20 text-green-400";
  
    if (status === "Drifting") {
      color =
        "bg-yellow-500/20 text-yellow-400";
    }
  
    if (status === "Unstable") {
      color =
        "bg-red-500/20 text-red-400";
    }
  
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
          Stability Status
        </p>
  
        <div
          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${color}`}
        >
          {status}
        </div>
      </div>
    );
  }