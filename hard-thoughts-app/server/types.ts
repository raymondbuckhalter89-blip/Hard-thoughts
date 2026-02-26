export type UserRole = "user" | "admin";
export type UserStatus = "active" | "suspended";

export type AdminUser = {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: number;
  lastActiveAt: number;
  adminNotes: string;
};

export type Invite = {
  id: string;
  code: string;
  maxUses: number;
  uses: number;
  createdAt: number;
  expiresAt: number | null;
  createdBy: string | null;
};

export type SearchEvent = {
  id: string;
  userId: string | null;
  query: string;
  createdAt: number;
  meta: Record<string, unknown>;
};

export type AdminStats = {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  admins: number;
  searchesLast7d: number;
  invitesActive: number;
};
