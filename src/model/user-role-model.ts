import type { role, user_role } from "@prisma/client";

export interface UserWithRole {
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  email_verified_at: Date | null;
  bio: string | null;
  is_active: boolean | null;
  user_role: Array<user_role & { role: role }>;
}
