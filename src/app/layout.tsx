import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/Components/Layout/Layout";

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
