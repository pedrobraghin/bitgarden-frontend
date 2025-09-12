import { Profile } from "./profile";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  providerId: string;
  avatarUrl: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
};

export type PublicUser = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
};
