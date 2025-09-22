"use client";

import { Button, Drawer } from "@/components";
import { useProjects } from "@/hooks/use-projects";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import { CreateProject, ProjectsList } from "./components";

export default function ProjectsPage() {
  const { getMyProjects } = useProjects();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  const handleLoadProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    await getMyProjects();
    setIsLoadingProjects(false);
  }, [getMyProjects]);

  useEffect(() => {
    handleLoadProjects();
  }, [handleLoadProjects]);

  return (
    <div className="p-10 flex flex-col gap-5">
      <Drawer open={isAddingProject}>
        <CreateProject
          onFinish={() => setIsAddingProject(false)}
          onCancel={() => setIsAddingProject(false)}
        />
      </Drawer>
      <header className="flex items-center justify-between">
        <span>Gerencie seus projetos ou crie novos</span>
        <Button
          label="Criar"
          icon={<FaPlus />}
          onClick={() => setIsAddingProject(true)}
        />
      </header>
      <div className="flex flex-col gap-4">
        <span>Meus projetos</span>
        <div>
          {isLoadingProjects ? (
            <div className="flex items-center justify-center w-full h-full">
              <GridLoader />
            </div>
          ) : (
            <ProjectsList />
          )}
        </div>
      </div>
    </div>
  );
}
