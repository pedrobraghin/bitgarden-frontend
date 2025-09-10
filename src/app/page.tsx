"use client";

import Link from "next/link";
import { useAuth } from "@/hooks";
import { Navigate } from "@/components";

export default function Home() {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn && user) {
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
