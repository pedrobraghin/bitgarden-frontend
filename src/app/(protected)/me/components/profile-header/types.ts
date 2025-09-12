export interface ProfileHeaderProps {
  avatarUrl: string;
  name: string;
  headline?: string;
  bio?: string;
  location?: string;
  username: string;
}

export type EditModeProps = ProfileHeaderProps & {
  onSave: () => void;
  onCancel: () => void;
};

export type ViewModeProps = ProfileHeaderProps & {
  onEdit: () => void;
};
