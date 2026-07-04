export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthTokens {
  token: string;
  ttl: string;
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ValidationErrors {
  [key: string]: string[] | string;
}
