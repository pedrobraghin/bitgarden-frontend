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
