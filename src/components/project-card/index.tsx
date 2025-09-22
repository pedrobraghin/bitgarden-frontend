import { Project } from "@/@types";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  return (
    <Link
      href={`/projects/${project.key}`}
      className="flex items-center gap-4 py-2 hover:bg-neutral-700 rounded-lg px-4"
    >
      <div>
        <span>{project.name}</span>
        <span className="line-clamp-2 overflow-ellipsis">
          {project.description}
        </span>
      </div>
    </Link>
  );
}
