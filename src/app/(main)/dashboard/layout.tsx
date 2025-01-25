import Container from "@/app/components/container/container";
import { createClient } from "@/app/utils/superbase/server";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
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

  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
