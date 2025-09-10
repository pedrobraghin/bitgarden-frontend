"use client";

import { useUserStore } from "@/lib/zustand";
import { ProfileHeader } from "./components";
import { LinksContainer } from "./components/links-container";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { useMemo } from "react";
import { UpdateUsername } from "@/components";

export default function MePage() {
  const { user } = useUserStore();

  const memoizedLinks = useMemo(() => {
    return [
      {
        label: "Github",
        url: user.profile.githubUrl,
        left: <FaGithub />,
      },
      {
        label: "LinkedIn",
        url: user.profile.linkedinUrl,
        left: <FaLinkedin />,
      },
      {
        label: "Website",
        url: user.profile.websiteUrl,
        left: <FaLink />,
      },
    ];
  }, [user.profile]);

  return (
    <div className="pt-20 pr-20">
      <div className="flex flex-col gap-10 border border-neutral-500/30 rounded-2xl p-10">
        <ProfileHeader
          avatarUrl={user.avatarUrl}
          bio={user.profile.bio}
          name={user.name}
          headline={user.profile.headline}
          location={user.profile.location}
        />
        <LinksContainer links={memoizedLinks} />
        <UpdateUsername />
      </div>
    </div>
  );
}
