import { createStore, useStore } from "zustand";
import { ProjectsStore } from "./types";
import { projectsActions } from "./actions";

export const projectsStore = createStore<ProjectsStore>((set, get) => ({
  newProject: null,
  myProjects: [],
  ...projectsActions(set, get),
}));

export function useProjectsStore() {
  return useStore(projectsStore);
}
