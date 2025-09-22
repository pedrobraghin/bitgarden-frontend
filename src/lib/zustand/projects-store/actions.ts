import { GetFunction, SetFunction } from "../common";
import { ProjectsStore, ProjectsStoreActions } from "./types";

export const projectsActions = (
  set: SetFunction<ProjectsStore>,
  get: GetFunction<ProjectsStore>
): ProjectsStoreActions => {
  return {
    setNewProjectData: (data) => {
      const { newProject } = get();

      set({
        newProject: {
          ...newProject,
          ...data,
        },
      });
    },
    setMyProjects: (myProjects) => {
      set({
        myProjects,
      });
    },
  };
};
