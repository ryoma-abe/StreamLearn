export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto">{children}</div>;
}
