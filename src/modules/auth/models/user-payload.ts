export interface UserPayload {
  sub: string;
  email: string;
  first_name: string;
  iat?: number;
  exp?: number;
}
