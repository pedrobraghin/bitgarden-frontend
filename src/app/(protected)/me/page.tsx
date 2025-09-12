"use client";
import { useMemo } from "react";
import { useUserStore } from "@/lib/zustand";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

import { ProfileHeader, LinksContainer } from "./components";

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
          username={user.username}
          headline={user.profile.headline}
          location={user.profile.location}
        />
        <LinksContainer links={memoizedLinks} />
      </div>
    </div>
  );
}
