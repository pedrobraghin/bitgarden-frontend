"use client";

import { useAuth } from "@/hooks";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { user, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || (!isLoading && !user)) {
    return null; // change to spinner
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-screen overflow-y-auto">{children}</main>
    </div>
  );
}
