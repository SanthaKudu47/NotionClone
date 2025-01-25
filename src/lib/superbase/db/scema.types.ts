import { InferSelectModel } from "drizzle-orm";
import { users, workspaces } from "../../../../drizzle/schema";

export type User = InferSelectModel<typeof users>;
export type Workspaces = InferSelectModel<typeof workspaces>;
