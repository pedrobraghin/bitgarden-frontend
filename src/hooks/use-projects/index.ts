import { Project } from "@/@types";
import { api } from "@/lib/api";
import { useProjectsStore } from "@/lib/zustand";
import { useCallback } from "react";

export function useProjects() {
  const { newProject, setMyProjects } = useProjectsStore();

  const getMyProjects = useCallback(async () => {
    try {
      const { data } = await api.get<Project[]>("/projects/my");
      setMyProjects(data);
    } catch {
      setMyProjects([]);
    }
  }, [setMyProjects]);

  const createProject = useCallback(async () => {
    try {
      const { data } = await api.post<Project>("/projects", newProject);
      await getMyProjects();
      return data;
    } catch {
      return null;
    }
  }, [newProject, getMyProjects]);

  const getProjectByKey = useCallback(async (key: string) => {
    try {
      const { data } = await api.get<Project>(`/projects/${key}`);
      return data;
    } catch {
      return null;
    }
  }, []);

  return {
    createProject,
    getProjectByKey,
    getMyProjects,
  };
}
