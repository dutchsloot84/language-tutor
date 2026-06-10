export function StatCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-ink/55">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
      {detail ? <p className="mt-1 text-sm text-ink/65">{detail}</p> : null}
    </div>
  );
}
