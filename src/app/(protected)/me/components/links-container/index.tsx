import { useMemo, useState } from "react";
import {
  Button,
  Container,
  Drawer,
  ExternalLink,
  ExternalLinkProps,
} from "@/components";
import { FaGithub, FaLink, FaLinkedin, FaPlus } from "react-icons/fa";
import { useUserStore } from "@/lib/zustand";
import { EditMode } from "./edit-mode";

export function LinksContainer() {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const {
    user: {
      profile: { githubUrl, linkedinUrl, websiteUrl },
    },
  } = useUserStore();

  const memoizedLinks: ExternalLinkProps[] =
    useMemo((): ExternalLinkProps[] => {
      const links: ExternalLinkProps[] = [];

      if (githubUrl) {
        links.push({
          label: "Github",
          url: githubUrl,
          left: <FaGithub />,
        });
      }

      if (linkedinUrl) {
        links.push({
          label: "LinkedIn",
          url: linkedinUrl,
          left: <FaLinkedin />,
        });
      }

      if (linkedinUrl) {
        links.push({
          label: "Website",
          url: websiteUrl,
          left: <FaLink />,
          withWarning: true,
        });
      }

      return links;
    }, [githubUrl, linkedinUrl, websiteUrl]);

  const renderedLinks = useMemo(() => {
    return memoizedLinks.map((data) => {
      return <ExternalLink {...data} key={data.label} />;
    });
  }, [memoizedLinks]);

  const content = useMemo(() => {
    if (memoizedLinks.length) return renderedLinks;

    return (
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
    );
  }, [renderedLinks, memoizedLinks]);

  return (
    <Container>
      <Drawer open={isEditingLinks}>
        <EditMode
          onCancel={() => setIsEditingLinks(false)}
          onSave={() => setIsEditingLinks(false)}
        />
      </Drawer>
      {content}
    </Container>
  );
}
