"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    tokenIndex: number;
    entropy: number;
  }[];
}

export default function EntropyGraph({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold">
          Entropy Drift
        </h2>

        <p className="text-sm text-zinc-400">
          Higher spikes indicate
          increased uncertainty
          during generation.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="tokenIndex" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="entropy"
              stroke="#22c55e"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}