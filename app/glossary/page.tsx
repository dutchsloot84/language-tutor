"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { glossary } from "@/lib/polish-content";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.toLowerCase();
    return glossary.filter((term) => `${term.pl} ${term.en} ${term.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <main className="page-shell">
      <PageHeader title="Glossary" eyebrow={`${glossary.length} starter terms`} />
      <section className="panel">
        <input
          className="focus-ring min-h-11 w-full rounded-md border border-black/15 bg-white px-3"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search terms, meanings, or tags"
        />
      </section>
      <section className="mt-5 grid gap-3 md:grid-cols-2">
        {visible.map((term) => (
          <article key={term.id} className="rounded-lg border border-black/10 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{term.pl}</h2>
                <p className="mt-1 text-ink/70">{term.en}</p>
              </div>
              <span className="chip">{term.tags[0]}</span>
            </div>
            <p className="mt-3 rounded-md bg-black/5 p-3 text-sm">{term.example}</p>
            {term.note ? <p className="mt-2 text-sm text-ink/65">{term.note}</p> : null}
          </article>
        ))}
      </section>
    </main>
  );
}
