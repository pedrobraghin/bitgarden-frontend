import { memo } from "react";
import { ProjectResultsProps } from "./types";
import { ProjectCard } from "@/components";

const BaseProjectResults = ({ projects }: Readonly<ProjectResultsProps>) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <h2>Projetos</h2>
        <span className="italic text-neutral-400 text-sm">
          Nenhum projeto encontrado.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2>Projetos</h2>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </div>
  );
};

export const ProjectResults = memo(BaseProjectResults);
