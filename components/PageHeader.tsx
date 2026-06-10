export function PageHeader({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-5">
      {eyebrow ? <p className="mb-1 text-xs font-bold uppercase tracking-wide text-moss">{eyebrow}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h1>
        {children}
      </div>
    </header>
  );
}
