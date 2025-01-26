"use server";

import { eq } from "drizzle-orm";
import { getConnectedDB } from "./db";
import { users, workspaces } from "../../../../drizzle/schema";
import { Workspaces } from "./scema.types";
import { createClient } from "@/app/utils/superbase/server";

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

async function createWorkspaceForUser(
  emojiUrl: string,
  logoUrl: string,
  title: string
) {
  //get user
  const superbase = await createClient();
  const { data, error } = await superbase.auth.getUser();

  if (error) {
    console.log("Failed to get Auth User");
    return undefined;
  }

  const { user } = data;

  const db = getConnectedDB();
  if (!db) {
    console.log("Failed to Connected to DB....");
    return undefined;
  }

  try {
    const workspace = {
      logo: logoUrl,
      iconId: emojiUrl,
      data: null,
      bannerUrl: null,
      createdAt: new Date().toISOString(),
      workspaceOwner: user.id,
      title: title,
    };
    return await db.insert(workspaces).values(workspace);
  } catch (error) {
    console.log("Failed to insert data to DB");
    console.log(error);
  }
  return undefined;
}

export { getUser, getFirstWorkspaces, createWorkspaceForUser };
