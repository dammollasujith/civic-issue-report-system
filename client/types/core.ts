export type UserRole = "citizen" | "admin";

export type MeResponse = {
  ok: true;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  };
};

