import "dotenv/config";
import { defineConfig } from "drizzle-kit";

//check for env

if (!process.env.DATABASE_URL_DIRECT_CONNECTION) {
  console.log("Cannot Find Direct DataBase Url");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/superbase/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_DIRECT_CONNECTION!,
  },
});
