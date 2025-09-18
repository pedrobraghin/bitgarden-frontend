"use client";

import { useState } from "react";
import { ViewMode } from "./view-mode";
import { EditMode } from "./edit-mode";
import { Drawer } from "@/components";

export function ProfileHeader() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <>
      <ViewMode onEdit={() => setIsEditingProfile(true)} />
      <Drawer open={isEditingProfile}>
        <div className="p-5">
          <EditMode
            onCancel={() => setIsEditingProfile(false)}
            onSave={() => setIsEditingProfile(false)}
          />
        </div>
      </Drawer>
    </>
  );
}
