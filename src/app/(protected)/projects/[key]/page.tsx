"use client";

import { Project } from "@/@types";
import { useProjects } from "@/hooks/use-projects";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

export default function ProjectPage() {
  const { key } = useParams();

  const { getProjectByKey } = useProjects();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadProject = useCallback(async () => {
    setIsLoading(true);

    if (!key) {
      return setProject(null);
    }

    const project = await getProjectByKey(key.toString());

    setProject(project);
    setIsLoading(false);
  }, [getProjectByKey, key]);

  useEffect(() => {
    handleLoadProject();
  }, [handleLoadProject]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <BounceLoader size={20} color="#fff" />
      </div>
    );
  }
  if (!project) {
    return (
      <div>
        <span>Projeto não encontrado</span>
      </div>
    );
  }

  return (
    <div>
      <span>Projeto: {project.name}</span>
    </div>
  );
}
