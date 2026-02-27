import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { loadReadingList, removeFromReadingList, type SavedStory } from '../lib/storage';

export default function ReadingList() {
  const [items, setItems] = useState<SavedStory[]>([]);

  useEffect(() => {
    setItems(loadReadingList());
  }, []);

  const empty = useMemo(() => items.length === 0, [items.length]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl">Reading List</h1>
          <p className="text-sm text-muted-foreground">Stored locally on your device (no account required).</p>
        </div>
        <button
          className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
          onClick={() => {
            setItems(loadReadingList());
          }}
        >
          Refresh
        </button>
      </header>

      {empty ? (
        <div className="p-6 rounded-2xl border border-border/40 bg-card/20">
          <p className="text-muted-foreground">Nothing saved yet. Go back to the directory and tap “Save”.</p>
          <div className="mt-4">
            <Link href="/" className="text-primary underline">Back to Home</Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((it) => (
            <div key={it.id} className="p-4 rounded-2xl border border-border/40 bg-card/20">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-sans font-semibold truncate">{it.title}</h2>
                  {it.description && <p className="text-sm text-muted-foreground mt-1">{it.description}</p>}
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Saved: {new Date(it.savedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  {it.url ? (
                    <a
                      className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 inline-flex items-center justify-center"
                      href={it.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  ) : (
                    <Link
                      href={`/reader/${encodeURIComponent(it.id)}`}
                      className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 inline-flex items-center justify-center"
                    >
                      Read
                    </Link>
                  )}
                  <button
                    className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                    onClick={() => {
                      removeFromReadingList(it.id);
                      setItems(loadReadingList());
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
