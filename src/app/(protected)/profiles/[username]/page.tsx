"use client";

import { PublicUser } from "@/@types";
import { useUser } from "@/hooks";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { ProfileHeaderViewMode } from "../../me/components/profile-header/profile-header-view-mode";
import { Container } from "@/components";
import { LinksContainerViewMode } from "../../me/components/links-container/links-container-view-mode";

export default function ProfilePage() {
  const { searchUserByUsername } = useUser();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  const handleLoadUser = useCallback(async () => {
    setIsLoading(true);

    if (!username) {
      return setUser(null);
    }

    const user = await searchUserByUsername(username.toString());

    setUser(user);
    setIsLoading(false);
  }, [searchUserByUsername, username]);

  useEffect(() => {
    handleLoadUser();
  }, [handleLoadUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <BounceLoader size={20} color="#fff" />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <span>Usuário não encontrado.</span>
      </div>
    );
  }
  const {
    profile: { githubUrl, linkedinUrl, websiteUrl },
  } = user;
  const hasLinks = Boolean(githubUrl || linkedinUrl || websiteUrl);

  return (
    <div className="p-10 flex flex-col gap-10">
      <Container>
        <ProfileHeaderViewMode user={user} />
      </Container>
      <div className="flex gap-8">
        {hasLinks && (
          <Container>
            <h2>Links</h2>
            <LinksContainerViewMode
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              websiteUrl={websiteUrl}
            />
          </Container>
        )}
        <Container className="w-full">
          <h2>Histórico de Contribuições</h2>
        </Container>
      </div>
      <Container>
        <div>
          <h2>Projetos</h2>
        </div>
      </Container>
    </div>
  );
}
