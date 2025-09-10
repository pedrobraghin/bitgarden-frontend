import { useCallback } from "react";
import { api } from "@/lib/api";
import { useUserStore } from "@/lib/zustand";

export function useUser() {
  const { storeUser } = useUserStore();

  const refetchUser = useCallback(async () => {
    try {
      const { data } = await api.get("/users/me");
      storeUser(data);
    } catch {}
  }, [storeUser]);

  const updateUsername = useCallback(
    async (username: string) => {
      try {
        await api.patch("/users", {
          username,
        });

        await refetchUser();

        return true;
      } catch {
        return false;
      }
    },
    [refetchUser]
  );

  const checkUsernameAvailability = useCallback(async (username: string) => {
    try {
      const { data } = await api.get(
        `/users/username-availability/${username}`
      );

      return data.available;
    } catch {
      return false;
    }
  }, []);

  return {
    updateUsername,
    checkUsernameAvailability,
    refetchUser,
  };
}
