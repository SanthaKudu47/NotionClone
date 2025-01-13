import Container from "@/app/components/container/container";
import Navigation from "@/app/components/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation></Navigation>
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
