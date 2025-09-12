import { useState } from "react";
import { ViewMode } from "./view-mode";
import { EditMode } from "./edit-mode";
import { ProfileHeaderProps } from "./types";

export function ProfileHeader(props: Readonly<ProfileHeaderProps>) {
  const [mode, setMode] = useState<"view" | "edit">("view");

  if (mode === "edit") {
    return (
      <EditMode
        {...props}
        onCancel={() => setMode("view")}
        onSave={() => setMode("view")}
      />
    );
  }

  return <ViewMode {...props} onEdit={() => setMode("edit")} />;
}
