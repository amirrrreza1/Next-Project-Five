import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Posts page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
