"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GridLoader } from "react-spinners";

interface NavigateProps {
  to: string;
}

export function Navigate({ to }: Readonly<NavigateProps>) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <GridLoader color="#fff" />
    </div>
  );
}
