import Navigation from "../components/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
