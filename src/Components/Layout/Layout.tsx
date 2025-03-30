"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/product",
    title: "Product",
  },
  {
    path: "/admin",
    title: "Admin",
  },
  {
    path: "/posts",
    title: "Posts",
  }
];

const Layout = ({ children }: any) => {
  const currentPath = usePathname();
  return (
    <>
      <header className="w-full sticky top-0 left-0 z-50">
        <nav className="w-full h-[60px] leading-[60px] flex justify-center items-center gap-3 bg-black text-white box-content">
          {Routes.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className={
                currentPath === route.path
                  ? "opacity-100 border-b-2 border-white"
                  : "opacity-50"
              }
            >
              {route.title}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
