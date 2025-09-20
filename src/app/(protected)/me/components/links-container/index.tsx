import { useState } from "react";
import { Button, Container, Drawer } from "@/components";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useUserStore } from "@/lib/zustand";
import { LinksContainerEditMode } from "./links-container-edit-mode";
import { LinksContainerViewMode } from "./links-container-view-mode";

export function LinksContainer() {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const {
    user: {
      profile: { githubUrl, linkedinUrl, websiteUrl },
    },
  } = useUserStore();

  const hasLinks = Boolean(githubUrl || linkedinUrl || websiteUrl);

  return (
    <Container>
      <Drawer open={isEditingLinks}>
        <LinksContainerEditMode
          onCancel={() => setIsEditingLinks(false)}
          onSave={() => setIsEditingLinks(false)}
        />
      </Drawer>
      <div>
        <div className="flex item-center justify-between">
          <h2>Links sociais</h2>
          {hasLinks && (
            <Button
              icon={<FaEdit size={20} />}
              label="Editar"
              onClick={() => setIsEditingLinks(true)}
            />
          )}
        </div>

        <div>
          {hasLinks ? (
            <LinksContainerViewMode
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              websiteUrl={websiteUrl}
            />
          ) : (
            <div className="flex gap-4 justify-center items-center">
              <span className="italic text-neutral-400">
                Adicione links para LinkedIn, GitHub ou portfólio.
              </span>
              <Button
                label="Adicionar"
                icon={<FaPlus />}
                onClick={() => setIsEditingLinks(true)}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
