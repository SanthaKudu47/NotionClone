"use server";

import { eq } from "drizzle-orm";
import { getConnectedDB } from "./db";
import { users } from "../../../../drizzle/schema";

async function getUser(userId: string) {
  const db = getConnectedDB();

  if (!db) {
    console.log("Failed to Connect Db...");
    return undefined;
  }

  try {
    return await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  } catch (error) {
    console.log("Failed to get user data", error);
  }
}

export { getUser };
