import { Profile } from "./profile";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  avatarUrl: string;
  profile: Profile;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  location: string;
  githubUsername?: string;
  linkedinUsername?: string;
  websiteUrl?: string;
  availableForOpportunities: boolean;
};

export type EditUser = {
  name?: string;
  username?: string;
  avatarUrl?: string;
};

export type EditUserFields = keyof EditUser;
