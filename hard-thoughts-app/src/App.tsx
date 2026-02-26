import { Route, Switch, Link } from 'wouter';
import Home from './pages/Home';
import ReadingList from './pages/ReadingList';
import StoryReader from './pages/StoryReader';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function Nav() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur border-b border-border/40 bg-background/70">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg text-foreground">Hard Thoughts</Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/reading-list" className="text-muted-foreground hover:text-foreground">Reading List</Link>
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card/20 text-foreground">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/reading-list" component={ReadingList} />
          <Route path="/reader/:id" component={StoryReader} />
          <Route path="/admin" component={Admin} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="max-w-5xl mx-auto px-4 py-10 text-xs text-muted-foreground/70">
        <p>Offline-capable demo build. You can wrap it into an Android APK using Capacitor (instructions included).</p>
      </footer>
    </div>
  );
}
