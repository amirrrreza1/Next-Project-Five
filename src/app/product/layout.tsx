import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Product",
  description: "product page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}
