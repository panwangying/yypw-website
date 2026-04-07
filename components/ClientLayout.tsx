"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = pathname !== "/intro";
  return (
    <>
      {showNav && <Navbar />}
      {children}
    </>
  );
}