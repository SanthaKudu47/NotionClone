import SetupWorkSpace from "@/app/components/SetupWorkspace";
import Workspace from "@/app/components/workspace";
import { createClient } from "@/app/utils/superbase/server";
import { getFirstWorkspaces } from "@/lib/superbase/db/queries";
import { redirect } from "next/navigation";

async function Dashboard() {
  const superBaseClient = await createClient();
  const { data, error } = await superBaseClient.auth.getUser();

  if (error) {
    console.log(error.message);
    return <div>Failed to Connect With SuperBase</div>;
  }
  const { user } = data;

  if (!user) {
    redirect("/signin");
  }
  const workspace = await getFirstWorkspaces(user.id);

  if (workspace) {
    return <Workspace user={user} />;
  } else {
    return (
      <div className="w-full h-screen flex flex-row justify-start lg:justify-center">
        <SetupWorkSpace userId={user.id} />
      </div>
    );
  }
}

export default Dashboard;
