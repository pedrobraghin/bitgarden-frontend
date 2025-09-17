"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { SquareLoader } from "react-spinners";

export default function LoginPage() {
  const error = useSearchParams().get("error");
  const router = useRouter();

  const { githubLogin, googleLogin, isLoading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/feed");
    }
  }, [isLoggedIn, router]);

  if (isLoading || isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <SquareLoader />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-black text-white">
      <h1>Login Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={githubLogin}
            className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Github Login
          </button>

          <button
            onClick={googleLogin}
            className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Google Login
          </button>
        </div>
      </div>
    </div>
  );
}
