export type Profile = {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  availableForOpportunities: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EditProfile = {
  headline?: string;
  bio?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  availableForOpportunities?: boolean;
};

export type EditProfileFields = keyof EditProfile;
