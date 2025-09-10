"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface NavigateProps {
  to: string;
}

export function Navigate({ to }: Readonly<NavigateProps>) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return "Loading...";
}
