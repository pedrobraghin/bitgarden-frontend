import { EditProfile, EditUser } from "@/@types";

export type OriginalData = {
  userData: EditUser;
  profileData: EditProfile;
};

export type EditableFields = EditUser & EditProfile & { apiError: string };
export type ErrorEntries = keyof EditableFields;
export type Errors = Partial<Record<ErrorEntries, string[]>>;
export type EditUserStoreState = {
  userData: EditUser;
  profileData: EditProfile;
  originalData: OriginalData;
  hasUnsavedChanges: boolean;
  errors: Errors;
};
export type ProfileLinks = {
  githubUrl?: EditProfile["githubUrl"];
  websiteUrl?: EditProfile["websiteUrl"];
};

export type EditUserStoreActions = {
  setUserData: (data: EditUser) => void;
  setProfileData: (data: EditProfile) => void;
  resetUnsavedChanges: () => void;
  setStoreInitialData: (data: OriginalData) => void;
  setUsername: (username: string) => Promise<void>;
  setErrors: (errors: Errors) => void;
  setProfileLinks: (data: ProfileLinks) => Promise<void>;
};

export type EditUserStore = EditUserStoreState & EditUserStoreActions;
