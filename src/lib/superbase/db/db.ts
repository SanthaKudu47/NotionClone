import "dotenv/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import * as schema from "../../../../drizzle/schema";

const connectionString = process.env.DATABASE_URL;

function getConnectedDB() {
  if (!connectionString) {
    return null;
  }

  try {
    const client = postgres(connectionString, { prepare: false, max: 1 });
    const db = drizzle({ client,schema:schema });
    console.log("Connected.....");
    return db;
  } catch (error) {
    console.log("Failed to Connect to database...");
    console.log(error);
    return null;
  }
}

async function migrateUpdates(
  db: PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
  }
) {
  try {
    console.log("Migration Starts Now.....");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration Success");
  } catch (error) {
    console.log("Failed to Migrate...");
    console.log(error);
  }
}



export { getConnectedDB, migrateUpdates };
