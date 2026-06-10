"use client";

import { Download, RotateCcw, Upload } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { exportState, importState, resetState } from "@/lib/storage";

export default function SettingsPage() {
  const [state, setState] = useAppState();

  return (
    <main className="page-shell">
      <PageHeader title="Settings & Data" eyebrow="Local-first storage" />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <h2 className="text-lg font-bold">Storage mode</h2>
          <p className="mt-2 text-sm text-ink/70">
            V1 stores progress in this browser’s localStorage. It works immediately and stays free, but each browser/device has its own copy unless you export and import data.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">No account</span>
            <span className="chip">No cloud required</span>
            <span className="chip">PWA-ready</span>
          </div>
        </div>

        <div className="panel">
          <h2 className="text-lg font-bold">Data tools</h2>
          <div className="mt-4 grid gap-2">
            <button className="secondary-button justify-start" onClick={() => state && exportState(state)}>
              <Download size={18} /> Export JSON
            </button>
            <label className="secondary-button cursor-pointer justify-start">
              <Upload size={18} /> Import JSON
              <input
                className="hidden"
                type="file"
                accept="application/json"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (file) setState(await importState(file));
                }}
              />
            </label>
            <button
              className="secondary-button justify-start border-tomato/30 text-tomato"
              onClick={() => {
                const confirmed = window.confirm("Reset all local progress in this browser?");
                if (confirmed) setState(resetState());
              }}
            >
              <RotateCcw size={18} /> Reset demo data
            </button>
          </div>
        </div>
      </section>

      <section className="panel mt-5">
        <h2 className="text-lg font-bold">Future paths</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink/70">
          <li>Local network: run `npm run dev:lan`, then open your Mac’s LAN IP on your phone.</li>
          <li>Static/free hosting: Vercel, Netlify, Cloudflare Pages, or GitHub Pages can host the UI later.</li>
          <li>Private sync later: add SQLite file sync, Tailscale/private access, or Supabase when multi-device/family profiles matter.</li>
        </ul>
      </section>
    </main>
  );
}
