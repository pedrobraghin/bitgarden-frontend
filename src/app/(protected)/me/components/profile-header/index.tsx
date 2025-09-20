"use client";

import { useState } from "react";
import { ProfileHeaderViewMode } from "./profile-header-view-mode";
import { ProfileHeaderEditMode } from "./profile-header-edit-mode";
import { Button, Container, Drawer } from "@/components";
import { useUserStore } from "@/lib/zustand";
import { FaEdit } from "react-icons/fa";

export function ProfileHeader() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user } = useUserStore();

  return (
    <Container>
      <div className="flex justify-between">
        <ProfileHeaderViewMode user={user} />
        <Button
          label="Editar"
          onClick={() => setIsEditingProfile(true)}
          icon={<FaEdit size={20} />}
        />
      </div>
      <Drawer open={isEditingProfile}>
        <div className="p-5">
          <ProfileHeaderEditMode
            onCancel={() => setIsEditingProfile(false)}
            onSave={() => setIsEditingProfile(false)}
          />
        </div>
      </Drawer>
    </Container>
  );
}
