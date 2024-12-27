import { getConnectedDB, migrateUpdates } from "@/lib/superbase/db/db";
import Image from "next/image";

export default async function Home() {
  // const db = getConnectedDB();
  // if (db) {
  //   await migrateUpdates(db);
  // }

  return (
    <main>
      <div className="text-white">Home page</div>
    </main>
  );
}
