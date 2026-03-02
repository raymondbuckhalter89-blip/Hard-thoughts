import { useMemo, useState } from 'react';
import { STORY_SOURCES, SOURCE_CATEGORY_LABELS, type StorySource } from '../lib/data';
import { addToReadingList } from '../lib/storage';

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | StorySource['category']>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STORY_SOURCES.filter(s => (category === 'all' || s.category === category) && (
      !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    ));
  }, [query, category]);

  return (
    <div className="space-y-6">
      <section className="p-5 rounded-2xl border border-border/40 bg-card/30">
        <h1 className="font-display text-2xl">Search portals, not content</h1>
        <p className="text-sm text-muted-foreground mt-2">
          This app is a curated directory of story sources and search links. It does not host stories.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input
            className="h-11 px-3 rounded-xl bg-background/70 border border-border/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter sources (name/description)…"
            aria-label="Filter sources"
          />
          <select
            className="h-11 px-3 rounded-xl bg-background/70 border border-border/50"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            aria-label="Category"
          >
            <option value="all">All categories</option>
            {Object.entries(SOURCE_CATEGORY_LABELS).map(([key, meta]) => (
              <option key={key} value={key}>{meta.icon} {meta.name}</option>
            ))}
          </select>
          <div className="text-xs text-muted-foreground/80 flex items-center">
            Tip: click a source to open it; use “Search” to jump straight to the site’s search.
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        {filtered.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl border border-border/40 bg-card/20 hover:bg-card/35 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <h2 className="font-sans font-semibold truncate">{s.name}</h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground">
                    {SOURCE_CATEGORY_LABELS[s.category].name}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                <p className="text-xs text-muted-foreground/60 mt-2 truncate">{s.url}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <button
                  className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                  onClick={() => openExternal(s.url)}
                >
                  Open
                </button>
                <button
                  className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                  onClick={() => {
                    const q = prompt(`Search ${s.name} for:`, '');
                    if (!q) return;
                    openExternal(s.searchUrl + encodeURIComponent(q));
                  }}
                >
                  Search
                </button>
                <button
                  className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                  onClick={() => {
                    addToReadingList({
                      id: `source:${s.id}`,
                      title: `Browse: ${s.name}`,
                      sourceName: s.name,
                      url: s.url,
                      description: s.description,
                    });
                    alert('Saved to Reading List.');
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
