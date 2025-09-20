import { Profile, PublicProfile } from "./profile";

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
  createdAt: string;
  profile: PublicProfile;
};

export type EditUser = {
  name?: string;
  username?: string;
  avatarUrl?: string;
};

export type EditUserFields = keyof EditUser;
