import { api } from "@/lib/api";
import {
  EditUserStore,
  EditUserStoreActions,
  Errors,
  OriginalData,
  ProfileLinks,
} from "./types";
import { GetFunction, SetFunction } from "../common";
import { EditProfile, EditUser } from "@/@types";

export const editUserActions = (
  set: SetFunction<EditUserStore>,
  get: GetFunction<EditUserStore>
): EditUserStoreActions => {
  return {
    setStoreInitialData: (data: OriginalData) => {
      set({
        originalData: data,
        hasUnsavedChanges: false,
      });
    },
    resetUnsavedChanges: () =>
      set({
        hasUnsavedChanges: false,
        userData: {} as EditUser,
        profileData: {} as EditProfile,
        errors: {},
      }),
    setUsername: async (username: string) => {
      const state = get();
      try {
        if (username.length < 6) {
          return state.setErrors({
            username: ["Nome de usuário deve conter ao menos 6 caracteres"],
          });
        }

        if (state.originalData.userData.username === username) {
          return state.setErrors({
            username: [],
          });
        }

        const { data } = await api.get(
          `/users/username-availability/${username}`
        );

        if (!data.available) {
          return state.setErrors({
            username: ["O nome de usuário escolhido já está em uso"],
          });
        }

        state.setUserData({ username });
        state.setErrors({ username: [] });
      } catch {
        return state.setErrors({
          username: ["Houve um erro ao tentar verificar o nome de usuário"],
        });
      }
    },
    setProfileData: (profileData: EditProfile) => {
      const state = get();
      const newProfileData = {
        ...state.profileData,
        ...profileData,
      };

      const hasChanges = Object.keys(newProfileData).some(
        (key) =>
          newProfileData[key as keyof EditProfile] !==
          state.originalData.profileData[key as keyof EditProfile]
      );

      set({
        profileData: newProfileData,
        hasUnsavedChanges: hasChanges,
      });
    },
    setProfileLinks: async (data: ProfileLinks) => {
      const state = get();
      try {
        if (data.githubUrl) {
          const linkedinPreview = await api.get("/preview", {
            params: {
              platform: "github",
              username: data.githubUrl,
            },
          });

          console.log(linkedinPreview);
        }
        state.setProfileData(data);
      } catch {
        state.setProfileData(data);
      }
    },
    setUserData: (userData: EditUser) => {
      const state = get();
      const newUserData = {
        ...state.userData,
        ...userData,
      };

      const hasChanges = Object.keys(newUserData).some(
        (key) =>
          newUserData[key as keyof EditUser] !==
          state.originalData.userData[key as keyof EditUser]
      );

      set({
        userData: newUserData,
        hasUnsavedChanges: hasChanges,
      });
    },
    setErrors: (errors: Errors) => {
      const state = get();
      set({
        errors: {
          ...state.errors,
          ...errors,
        },
      });
    },
  };
};
