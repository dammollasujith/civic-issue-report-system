export type UserRole = "citizen" | "admin";

export type JwtPayload = {
  sub: string;
  role: UserRole;
};

