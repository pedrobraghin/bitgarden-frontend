import { EditProfile, EditUser } from "@/@types";
import { createStore, useStore } from "zustand";

import { EditUserStore, OriginalData } from "./types";
import { editUserActions } from "./actions";

export const editUserStore = createStore<EditUserStore>((set, get) => ({
  profileData: {} as EditProfile,
  userData: {} as EditUser,
  originalData: {} as OriginalData,
  hasUnsavedChanges: false,
  isValidUsername: true,
  isUsernameAvailable: true,
  errors: {},
  ...editUserActions(set, get),
}));

export function useEditUserStore() {
  return useStore(editUserStore);
}
