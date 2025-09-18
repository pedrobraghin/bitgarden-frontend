"use client";

import { useAuth } from "@/hooks";
import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components";
import { useUserStore } from "@/lib/zustand";
import { GridLoader } from "react-spinners";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { isLoading, isLoggedIn } = useAuth();
  const { user } = useUserStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const userExists = Boolean(Object.keys(user).length);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && (!userExists || !isLoggedIn)) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, userExists, router]);

  if (!mounted) {
    return null;
  }

  if (isLoading || (!isLoading && !userExists)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#fff" />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-screen overflow-y-auto">{children}</main>
    </div>
  );
}
