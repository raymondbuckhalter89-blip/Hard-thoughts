import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="p-6 rounded-2xl border border-border/40 bg-card/20">
      <h1 className="font-display text-2xl">404</h1>
      <p className="text-sm text-muted-foreground mt-2">You have discovered a region of spacetime where this route does not exist.</p>
      <div className="mt-4">
        <Link href="/" className="text-primary underline">Go home</Link>
      </div>
    </div>
  );
}
