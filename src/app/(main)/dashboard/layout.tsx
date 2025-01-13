import Container from "@/app/components/container/container";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
