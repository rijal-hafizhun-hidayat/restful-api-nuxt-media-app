import type { role } from "@prisma/client";

export interface FormatUser {
  id: number;
  name: string;
  email: string;
  role?: role[];
}
