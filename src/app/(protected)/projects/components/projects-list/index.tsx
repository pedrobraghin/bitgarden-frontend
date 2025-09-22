import { Container, ProjectCard } from "@/components";
import { useProjectsStore } from "@/lib/zustand";
import { memo } from "react";

export function BaseProjectsList() {
  const { myProjects } = useProjectsStore();

  return (
    <div className="flex flex-col gap-2">
      {myProjects.map((p) => {
        return (
          <Container key={p.key} className="p-0">
            <ProjectCard project={p} />
          </Container>
        );
      })}
    </div>
  );
}

export const ProjectsList = memo(BaseProjectsList);
