export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarColor: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthSession {
  userId: string;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
