"use client";
import { useMemo } from "react";
import { useUserStore } from "@/lib/zustand";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

import { ProfileHeader, LinksContainer, ExternalLinkProps } from "./components";

export default function MePage() {
  const { user } = useUserStore();

  const memoizedLinks: ExternalLinkProps[] =
    useMemo((): ExternalLinkProps[] => {
      const links: ExternalLinkProps[] = [];

      if (user.profile.githubUrl) {
        links.push({
          label: "Github",
          url: user.profile.githubUrl,
          left: <FaGithub />,
        });
      }

      if (user.profile.linkedinUrl) {
        links.push({
          label: "LinkedIn",
          url: user.profile.linkedinUrl,
          left: <FaLinkedin />,
        });
      }

      if (user.profile.linkedinUrl) {
        links.push({
          label: "Website",
          url: user.profile.websiteUrl,
          left: <FaLink />,
          withWarning: true,
        });
      }

      return links;
    }, [user.profile]);

  return (
    <div className="pt-20 pr-20">
      <div className="flex flex-col gap-4 border border-neutral-500/30 rounded-2xl p-10">
        <ProfileHeader />
        <LinksContainer links={memoizedLinks} />
      </div>
    </div>
  );
}
