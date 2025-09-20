import { PublicUser } from "@/@types";

export type ProfileHeaderEditModeProps = {
  onSave: () => void;
  onCancel: () => void;
};

export type ProfileHeaderViewModeProps = {
  user: PublicUser;
};
