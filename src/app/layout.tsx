import type { Metadata } from "next";
import "./globals.css";
import MainContent from "@/components/common/main-content";
import Header from "@/components/common/header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
