export interface ExternalLinkProps {
  url?: string;
  label: string;
  left?: React.ReactNode;
}

export function ExternalLink({
  label,
  url,
  left,
}: Readonly<ExternalLinkProps>) {
  return (
    <a href={url} target="_blank">
      <div className="flex items-center gap-3 pl-4 pr-6 py-3 border transition-colors border-transparent hover:border-neutral-300/30 rounded-lg">
        {left}
        <span>{label}</span>
      </div>
    </a>
  );
}
