"use server";

import { eq } from "drizzle-orm";
import { getConnectedDB } from "./db";
import { users, workspaces } from "../../../../drizzle/schema";
import { Workspaces } from "./scema.types";

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
    return undefined;
  }
}

async function getFirstWorkspaces(userId: string) {
  const db = getConnectedDB();
  if (!db) {
    console.log("Failed to Connect Db...");
    return undefined;
  }

  try {
    return await db.query.workspaces.findFirst({
      where: eq(workspaces.id, userId),
    });
  } catch (error) {
    console.log("Failed to Fetch Workspaces...");
  }
  return undefined;
}

async function createWorkspaceForUser(userId: string, workspace: Workspaces) {
  const db = getConnectedDB();
  if (!db) {
    console.log("Failed to Connected to DB....");
    return undefined;
  }

  try {
    return await db.insert(workspaces).values(workspace);
  } catch (error) {
    console.log("Failed to insert data to DB");
    console.log(error);
  }
  return undefined;
}

export { getUser, getFirstWorkspaces, createWorkspaceForUser };
