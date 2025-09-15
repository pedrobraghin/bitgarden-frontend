"use client";

import { useAuth } from "@/hooks";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components";
import { useUserStore } from "@/lib/zustand";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isLoading } = useAuth();
  const { user } = useUserStore();

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
