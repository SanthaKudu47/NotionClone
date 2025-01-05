import Navigation from "../components/navigation";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}

export default layout;
