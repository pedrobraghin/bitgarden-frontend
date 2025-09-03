import {createStore} from "zustand/vanilla";
import {User} from "@/@types";
import {useStore} from "zustand/react";

type UserStoreState = {
  user: User;
};

type UserStoreActions = {
  setUser: (user: User) => void;
};

type UserStore = UserStoreState & UserStoreActions;

export const userStore = createStore<UserStore>((set) => ({
  setUser: (user: User) => set({user}),
  user: {} as User,
}));

export function useUserStore() {
  return useStore(userStore)
}