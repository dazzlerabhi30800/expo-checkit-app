import { UserAppMetadata } from "@supabase/supabase-js";

export type user = UserAppMetadata | null | undefined;

export type theme = "dark" | "light";

export interface task {
  id: string;
  created_at: string;
  task: string;
  createdBy: string;
  completed: boolean;
}
