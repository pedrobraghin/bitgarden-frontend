import { ExternalLink, ExternalLinkProps } from "@/components";
import { LinksContainerViewModeProps } from "../types";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { useMemo } from "react";

export function LinksContainerViewMode({
  githubUrl,
  linkedinUrl,
  websiteUrl,
}: Readonly<LinksContainerViewModeProps>) {
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

      if (websiteUrl) {
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
    return (
      <div className="flex items-center gap-2">
        {memoizedLinks.map((data) => (
          <ExternalLink {...data} key={data.label} />
        ))}
      </div>
    );
  }, [memoizedLinks]);

  return renderedLinks;
}
