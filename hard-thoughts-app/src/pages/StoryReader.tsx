import { useMemo } from 'react';
import { useLocation, useRoute } from 'wouter';
import { loadReadingList } from '../lib/storage';

const SAMPLE_TEXT = `Hard Thoughts (Demo)

This build is an offline demo. In the full version, this page would fetch and render a story you saved.

For now, imagine a cosmic librarian hands you a book and says: "Please return this before the heat death of the universe."\n\nYou nod politely. You are doomed.
`;

export default function StoryReader() {
  const [, params] = useRoute('/reader/:id');
  const [, setLocation] = useLocation();
  const id = params?.id ? decodeURIComponent(params.id) : '';

  const item = useMemo(() => loadReadingList().find(s => s.id === id), [id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl">{item?.title ?? 'Reader'}</h1>
          <p className="text-sm text-muted-foreground">{item?.author ? `by ${item.author}` : 'Offline demo reader'}</p>
        </div>
        <button
          className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
          onClick={() => setLocation('/reading-list')}
        >
          Back
        </button>
      </div>

      {item?.url ? (
        <div className="p-5 rounded-2xl border border-border/40 bg-card/20">
          <p className="text-muted-foreground">This item is an external link.</p>
          <a className="text-primary underline" href={item.url} target="_blank" rel="noreferrer">Open in browser</a>
        </div>
      ) : (
        <article className="p-5 rounded-2xl border border-border/40 bg-card/20 whitespace-pre-wrap leading-relaxed">
          {SAMPLE_TEXT}
        </article>
      )}
    </div>
  );
}
