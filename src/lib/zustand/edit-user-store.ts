import { EditProfile, EditUser } from "@/@types";
import { createStore, useStore } from "zustand";

export type OriginalData = {
  userData: EditUser;
  profileData: EditProfile;
};

export type EditUserStoreState = {
  userData: EditUser;
  profileData: EditProfile;
  originalData: OriginalData;
  hasUnsavedChanges: boolean;
  error?: string;
};

type EditUserStoreActions = {
  setUserData: (data: EditUser) => void;
  setProfileData: (data: EditProfile) => void;
  resetUnsavedChanges: () => void;
  setStoreInitialData: (data: OriginalData) => void;
  setError: (error: string) => void;
};

type EditUserStore = EditUserStoreState & EditUserStoreActions;

export const editUserStore = createStore<EditUserStore>((set) => ({
  profileData: {} as EditProfile,
  userData: {} as EditUser,
  originalData: {} as OriginalData,
  hasUnsavedChanges: false,
  setError: (error: string) => set({ error }),
  setStoreInitialData: (data: OriginalData) =>
    set({
      originalData: data,
      hasUnsavedChanges: false,
    }),
  resetUnsavedChanges: () =>
    set({
      hasUnsavedChanges: false,
      userData: {} as EditUser,
      profileData: {} as EditProfile,
    }),
  setProfileData: (profileData: EditProfile) =>
    set((state) => {
      const newProfileData = {
        ...state.profileData,
        ...profileData,
      };

      const hasChanges = Object.keys(newProfileData).some(
        (key) =>
          newProfileData[key as keyof EditProfile] !==
          state.originalData.profileData[key as keyof EditProfile]
      );

      return {
        profileData: newProfileData,
        hasUnsavedChanges: hasChanges,
      };
    }),
  setUserData: (userData: EditUser) =>
    set((state) => {
      const newUserData = {
        ...state.userData,
        ...userData,
      };

      const hasChanges = Object.keys(newUserData).some(
        (key) =>
          newUserData[key as keyof EditUser] !==
          state.originalData.userData[key as keyof EditUser]
      );

      return {
        userData: newUserData,
        hasUnsavedChanges: hasChanges,
      };
    }),
}));

export function useEditUserStore() {
  return useStore(editUserStore);
}
