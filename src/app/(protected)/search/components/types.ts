import { Project, PublicUser } from "@/@types";

export interface SearchResultProps {
  term: string;
  isLoading: boolean;
  isError: boolean;
  users: PublicUser[];
  projects: Project[];
}

export interface UserResultsProps {
  users: PublicUser[];
}

export interface ProjectResultsProps {
  projects: Project[];
}
