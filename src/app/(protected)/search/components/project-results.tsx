import { memo } from "react";
import { ProjectResultsProps } from "./types";

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
    <div>
      <span>Projetos</span>
      <div>
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200/50"
          >
            <div>
              <span>{project.name}</span>
              <span className="line-clamp-2 overflow-ellipsis">
                {project.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectResults = memo(BaseProjectResults);
