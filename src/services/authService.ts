import type { User, LoginCredentials, RegisterCredentials } from '../types/auth';

const USERS_STORAGE_KEY = 'blush_users_registry_v1';
const SESSION_STORAGE_KEY = 'blush_active_session_v1';

const AVATAR_COLORS = [
  '#D45B6C',
  '#A34360',
  '#6F5A82',
  '#2D6E82',
  '#477553',
  '#A8572A',
  '#7B4B82',
  '#3A638C'
];

async function hashPassword(password: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }
  // Simple deterministic hash fallback
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(16);
}

export const authService = {
  getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users registry', e);
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionRaw) return null;
      const session = JSON.parse(sessionRaw);
      if (!session || !session.userId) return null;

      const users = this.getUsers();
      return users.find(u => u.id === session.userId) || null;
    } catch {
      return null;
    }
  },

  async register(creds: RegisterCredentials): Promise<{ user?: User; error?: string }> {
    const name = creds.name.trim();
    const email = creds.email.trim().toLowerCase();
    const password = creds.password;

    if (!name) return { error: 'Full name is required.' };
    if (!email || !email.includes('@')) return { error: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { error: 'Password must be at least 6 characters.' };
    if (creds.confirmPassword && password !== creds.confirmPassword) {
      return { error: 'Passwords do not match.' };
    }

    const users = this.getUsers();
    const existing = users.find(u => u.email === email);
    if (existing) {
      return { error: 'An account with this email already exists. Please sign in.' };
    }

    const passwordHash = await hashPassword(password);
    const color = AVATAR_COLORS[users.length % AVATAR_COLORS.length];

    const newUser: User = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name,
      email,
      passwordHash,
      avatarColor: color,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Save active session
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      userId: newUser.id,
      token: 'tok_' + Math.random().toString(36).substring(2),
      email: newUser.email,
      createdAt: new Date().toISOString()
    }));

    return { user: newUser };
  },

  async login(creds: LoginCredentials): Promise<{ user?: User; error?: string }> {
    const email = creds.email.trim().toLowerCase();
    const password = creds.password;

    if (!email) return { error: 'Email is required.' };
    if (!password) return { error: 'Password is required.' };

    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return { error: 'No account found with this email. Please register.' };
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      return { error: 'Incorrect password. Please try again.' };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    this.saveUsers(users);

    // Save active session
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      userId: user.id,
      token: 'tok_' + Math.random().toString(36).substring(2),
      email: user.email,
      createdAt: new Date().toISOString()
    }));

    return { user };
  },

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};
