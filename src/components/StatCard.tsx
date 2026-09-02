import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  delta,
  positive = true,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: LucideIcon;
}) {
  return (
    <div className="card flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <span className="text-caption text-smoke">{label}</span>
        <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center">
          <Icon size={16} className="text-phosphor-green" strokeWidth={1.5} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-heading-sm text-snow">{value}</span>
        {delta ? (
          <span className={`text-caption ${positive ? "text-phosphor-green" : "text-smoke"}`}>
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
