import { useMemo } from "react";
import { ExternalLink, ExternalLinkProps } from "@/components";

interface LinksContainerProps {
  links: ExternalLinkProps[];
}
export function LinksContainer({ links }: Readonly<LinksContainerProps>) {
  const renderedLinks = useMemo(() => {
    return links.map((data) => {
      return data.url ? <ExternalLink {...data} key={data.label} /> : null;
    });
  }, [links]);

  return (
    <div className="flex items-center justify-start gap-4">{renderedLinks}</div>
  );
}
