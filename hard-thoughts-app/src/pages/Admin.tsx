import { useEffect, useMemo, useState } from 'react';
import { createInvite, deleteUser, getInvites, getSearchEvents, getStats, getUsers, seedIfEmpty, updateUser, type AdminUser, type Invite, type SearchEvent, type UserRole, type UserStatus } from '../lib/adminStore';

type Tab = 'overview' | 'users' | 'history' | 'invites';

const PIN_KEY = 'ht_admin_pin_v1';
const SESSION_KEY = 'ht_admin_session_v1';

function getAdminPin(): string {
  const existing = localStorage.getItem(PIN_KEY);
  if (existing) return existing;
  localStorage.setItem(PIN_KEY, '4242');
  return '4242';
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-2xl border border-border/40 bg-card/20">
      <div className="text-2xl font-display">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Pill({ children }: { children: any }) {
  return <span className="text-[11px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground">{children}</span>;
}

export default function Admin() {
  const [tab, setTab] = useState<Tab>('overview');
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [events, setEvents] = useState<SearchEvent[]>([]);

  const [userSearch, setUserSearch] = useState('');
  const [inviteMaxUses, setInviteMaxUses] = useState(1);
  const [inviteExpiryDays, setInviteExpiryDays] = useState(7);

  useEffect(() => {
    seedIfEmpty();
    const session = localStorage.getItem(SESSION_KEY);
    if (session === 'ok') setAuthed(true);
  }, []);

  function refresh() {
    setUsers(getUsers());
    setInvites(getInvites());
    setEvents(getSearchEvents());
  }

  useEffect(() => {
    if (!authed) return;
    refresh();
  }, [authed]);

  const stats = useMemo(() => (authed ? getStats() : null), [authed, users.length, invites.length, events.length]);

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  }, [users, userSearch]);

  if (!authed) {
    return (
      <div className="max-w-lg mx-auto p-6 rounded-2xl border border-border/40 bg-card/20">
        <h1 className="font-display text-2xl">Admin</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Local demo login. Default PIN is <span className="font-mono">4242</span>.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            className="h-11 px-3 rounded-xl bg-background/70 border border-border/50 flex-1"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            inputMode="numeric"
          />
          <button
            className="h-11 px-4 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
            onClick={() => {
              const real = getAdminPin();
              if (pin.trim() === real) {
                localStorage.setItem(SESSION_KEY, 'ok');
                setAuthed(true);
              } else {
                alert('Wrong PIN');
              }
            }}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-xs text-muted-foreground/70">
          In the real build you’ll swap this for your backend auth (TRPC / JWT / whatever grim deity you worship).
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Local data store (offline demo). Build-ready for APK wrapping.</p>
        </div>
        <div className="flex gap-2">
          <button
            className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
            onClick={refresh}
          >
            Refresh
          </button>
          <button
            className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
            onClick={() => {
              localStorage.removeItem(SESSION_KEY);
              setAuthed(false);
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {(['overview','users','history','invites'] as Tab[]).map(t => (
          <button
            key={t}
            className={`h-9 px-3 rounded-xl border border-border/50 ${tab === t ? 'bg-primary/15 text-primary border-primary/30' : 'bg-background/50 hover:bg-background/70'}`}
            onClick={() => setTab(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && stats && (
        <section className="grid gap-3 sm:grid-cols-3">
          <Stat label="Total users" value={stats.usersTotal} />
          <Stat label="Active" value={stats.usersActive} />
          <Stat label="Suspended" value={stats.usersSuspended} />
          <Stat label="Banned" value={stats.usersBanned} />
          <Stat label="Invites" value={stats.invitesTotal} />
          <Stat label="Search events" value={stats.searchesTotal} />
        </section>
      )}

      {tab === 'users' && (
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              className="h-11 px-3 rounded-xl bg-background/70 border border-border/50 flex-1"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users (name/email/id)…"
            />
            <button
              className="h-11 px-4 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
              onClick={() => {
                const newPin = prompt('Set new admin PIN:', getAdminPin());
                if (!newPin) return;
                localStorage.setItem(PIN_KEY, newPin.trim());
                alert('PIN updated.');
              }}
            >
              Change PIN
            </button>
          </div>

          <div className="grid gap-3">
            {filteredUsers.map(u => (
              <div key={u.id} className="p-4 rounded-2xl border border-border/40 bg-card/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-sans font-semibold truncate">{u.name || 'Unnamed'}</div>
                      <Pill>{u.role}</Pill>
                      <Pill>{u.status}</Pill>
                      <span className="text-[11px] text-muted-foreground/70">{u.email || 'no-email'}</span>
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">
                      <span className="font-mono">{u.id}</span> · joined {new Date(u.createdAt).toLocaleDateString()} · last {new Date(u.lastSignedIn).toLocaleString()}
                    </div>
                    <div className="mt-3">
                      <textarea
                        className="w-full min-h-[70px] p-3 rounded-xl bg-background/70 border border-border/50 text-sm"
                        defaultValue={u.adminNotes || ''}
                        placeholder="Admin notes…"
                        onBlur={(e) => {
                          updateUser(u.id, { adminNotes: e.target.value });
                          refresh();
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <select
                      className="h-10 px-3 rounded-xl bg-background/70 border border-border/50"
                      value={u.status}
                      onChange={(e) => {
                        updateUser(u.id, { status: e.target.value as UserStatus });
                        refresh();
                      }}
                    >
                      <option value="active">active</option>
                      <option value="suspended">suspended</option>
                      <option value="banned">banned</option>
                    </select>

                    <select
                      className="h-10 px-3 rounded-xl bg-background/70 border border-border/50"
                      value={u.role}
                      onChange={(e) => {
                        updateUser(u.id, { role: e.target.value as UserRole });
                        refresh();
                      }}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>

                    <button
                      className="h-10 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                      onClick={() => {
                        if (confirm(`Delete ${u.name || u.email || u.id}?`)) {
                          deleteUser(u.id);
                          refresh();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'history' && (
        <section className="space-y-3">
          <div className="p-4 rounded-2xl border border-border/40 bg-card/20">
            <p className="text-sm text-muted-foreground">Search events are recorded locally by the demo (up to 500).</p>
          </div>
          <div className="grid gap-2">
            {events.slice(0, 200).map(e => (
              <div key={e.id} className="p-3 rounded-2xl border border-border/30 bg-card/15 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm truncate">{e.query}</div>
                  <div className="text-xs text-muted-foreground/70">{new Date(e.createdAt).toLocaleString()} · {e.userId ?? 'anon'}</div>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="p-4 rounded-2xl border border-border/40 bg-card/20 text-muted-foreground">No history yet.</div>
            )}
          </div>
        </section>
      )}

      {tab === 'invites' && (
        <section className="space-y-3">
          <div className="p-4 rounded-2xl border border-border/40 bg-card/20">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Max uses</div>
                <input
                  className="h-11 px-3 rounded-xl bg-background/70 border border-border/50 w-full"
                  type="number"
                  min={1}
                  value={inviteMaxUses}
                  onChange={(e) => setInviteMaxUses(parseInt(e.target.value || '1', 10))}
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Expiry (days, 0=never)</div>
                <input
                  className="h-11 px-3 rounded-xl bg-background/70 border border-border/50 w-full"
                  type="number"
                  min={0}
                  value={inviteExpiryDays}
                  onChange={(e) => setInviteExpiryDays(parseInt(e.target.value || '7', 10))}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="h-11 px-4 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70 w-full"
                  onClick={() => {
                    const inv = createInvite(inviteMaxUses, inviteExpiryDays);
                    refresh();
                    navigator.clipboard?.writeText(inv.code).catch(() => {});
                    alert(`Invite created: ${inv.code} (copied if permitted)`);
                  }}
                >
                  Create Invite
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            {invites.map(i => (
              <div key={i.id} className="p-4 rounded-2xl border border-border/40 bg-card/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="font-mono text-lg">{i.code}</div>
                    <div className="text-xs text-muted-foreground/70">
                      created {new Date(i.createdAt).toLocaleString()} · expires {i.expiresAt ? new Date(i.expiresAt).toLocaleDateString() : 'never'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill>{i.uses}/{i.maxUses} uses</Pill>
                    <button
                      className="h-9 px-3 rounded-xl border border-border/50 bg-background/50 hover:bg-background/70"
                      onClick={() => {
                        navigator.clipboard?.writeText(i.code).catch(() => {});
                        alert('Copied (if permitted).');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {invites.length === 0 && (
              <div className="p-4 rounded-2xl border border-border/40 bg-card/20 text-muted-foreground">No invites created yet.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
