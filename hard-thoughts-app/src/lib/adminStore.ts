export type UserStatus = 'active' | 'suspended' | 'banned';
export type UserRole = 'user' | 'admin';

export type AdminUser = {
  id: string;
  name?: string;
  email?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastSignedIn: string;
  loginMethod?: string;
  adminNotes?: string;
};

export type Invite = {
  id: string;
  code: string;
  createdAt: string;
  expiresAt: string | null;
  maxUses: number;
  uses: number;
};

export type SearchEvent = {
  id: string;
  userId: string | null;
  query: string;
  createdAt: string;
};

const KEY_USERS = 'ht_admin_users_v1';
const KEY_INVITES = 'ht_admin_invites_v1';
const KEY_SEARCH = 'ht_admin_search_v1';

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function seedIfEmpty() {
  if (!localStorage.getItem(KEY_USERS)) {
    const now = new Date().toISOString();
    const users: AdminUser[] = [
      {
        id: 'u_admin',
        name: 'Admin',
        email: 'admin@local',
        role: 'admin',
        status: 'active',
        createdAt: now,
        lastSignedIn: now,
        loginMethod: 'local',
        adminNotes: 'Local demo admin user.'
      },
      {
        id: 'u_demo',
        name: 'Demo User',
        email: 'demo@local',
        role: 'user',
        status: 'active',
        createdAt: now,
        lastSignedIn: now,
        loginMethod: 'local'
      }
    ];
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }
  if (!localStorage.getItem(KEY_INVITES)) {
    localStorage.setItem(KEY_INVITES, JSON.stringify([] as Invite[]));
  }
  if (!localStorage.getItem(KEY_SEARCH)) {
    localStorage.setItem(KEY_SEARCH, JSON.stringify([] as SearchEvent[]));
  }
}

export function getUsers(): AdminUser[] {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(KEY_USERS) || '[]');
}

export function saveUsers(users: AdminUser[]) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export function updateUser(userId: string, patch: Partial<AdminUser>) {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return;
  users[idx] = { ...users[idx], ...patch };
  saveUsers(users);
}

export function deleteUser(userId: string) {
  const users = getUsers().filter(u => u.id !== userId);
  saveUsers(users);
}

export function getInvites(): Invite[] {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(KEY_INVITES) || '[]');
}

export function saveInvites(invites: Invite[]) {
  localStorage.setItem(KEY_INVITES, JSON.stringify(invites));
}

export function createInvite(maxUses: number, expiresInDays: number): Invite {
  const now = new Date();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const inv: Invite = {
    id: uid('inv'),
    code,
    createdAt: now.toISOString(),
    expiresAt: expiresInDays > 0 ? new Date(now.getTime() + expiresInDays * 86400000).toISOString() : null,
    maxUses: Math.max(1, maxUses | 0),
    uses: 0,
  };
  const invites = getInvites();
  invites.unshift(inv);
  saveInvites(invites);
  return inv;
}

export function getSearchEvents(): SearchEvent[] {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(KEY_SEARCH) || '[]');
}

export function logSearch(query: string, userId: string | null = null) {
  const events = getSearchEvents();
  events.unshift({ id: uid('s'), userId, query, createdAt: new Date().toISOString() });
  localStorage.setItem(KEY_SEARCH, JSON.stringify(events.slice(0, 500)));
}

export function getStats() {
  const users = getUsers();
  const invites = getInvites();
  const events = getSearchEvents();

  const active = users.filter(u => u.status === 'active').length;
  const suspended = users.filter(u => u.status === 'suspended').length;
  const banned = users.filter(u => u.status === 'banned').length;

  const usedInvites = invites.reduce((acc, i) => acc + i.uses, 0);

  return {
    usersTotal: users.length,
    usersActive: active,
    usersSuspended: suspended,
    usersBanned: banned,
    invitesTotal: invites.length,
    invitesUses: usedInvites,
    searchesTotal: events.length,
  };
}
