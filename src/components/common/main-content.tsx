export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {children}
    </main>
  );
}
