"use client";

import { useCallback } from "react";
import { ViewMode } from "./view-mode";
import { EditMode } from "./edit-mode";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "view" | "edit";

export function ProfileHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as Mode) ?? "view";

  const handleChangeMode = useCallback(
    (newMode: Mode) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", newMode);
      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (mode === "edit") {
    return (
      <EditMode
        onCancel={() => handleChangeMode("view")}
        onSave={() => handleChangeMode("view")}
      />
    );
  }

  return <ViewMode onEdit={() => handleChangeMode("edit")} />;
}
