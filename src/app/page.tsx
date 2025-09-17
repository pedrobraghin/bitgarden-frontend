"use client";

import Link from "next/link";
import { useAuth } from "@/hooks";
import { Navigate } from "@/components";
import { GridLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <GridLoader color="#fff" />
      </div>
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link
        href="/login"
        className="px-6 py-4 border rounded-lg hover:bg-neutral-400/50 transition-colors"
      >
        Fazer login
      </Link>
    </div>
  );
}
