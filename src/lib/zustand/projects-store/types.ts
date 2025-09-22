import { CreateProject, Project } from "@/@types";

export type ProjectsStoreActions = {
  setNewProjectData: (data: CreateProject) => void;
  setMyProjects: (projects: Project[]) => void;
};

export type ProjectsStoreState = {
  newProject: CreateProject | null;
  myProjects: Project[];
};

export type ProjectsStore = ProjectsStoreActions & ProjectsStoreState;
