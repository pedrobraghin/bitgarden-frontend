import { useCallback } from "react";
import { api } from "@/lib/api";
import { OriginalData, useEditUserStore, useUserStore } from "@/lib/zustand";
import { User } from "@/@types";
import { AxiosResponse } from "axios";

export function useUser() {
  const { storeUser } = useUserStore();
  const { setStoreInitialData, profileData, userData, setError } =
    useEditUserStore();

  const fetchUser = useCallback(
    async (isRefetch?: boolean) => {
      try {
        const { data } = await api.get("/users/me");

        const profileData = {
          availableForOpportunities: data.profile.availableForOpportunities,
          bio: data.profile.bio,
          githubUrl: data.profile.githubUrl,
          headline: data.profile.headline,
          linkedinUrl: data.profile.linkedinUrl,
          location: data.profile.location,
          websiteUrl: data.profile.websiteUrl,
        };

        const userData = {
          avatarUrl: data.avatarUrl,
          name: data.name,
          username: data.username,
        };

        storeUser(data);
        if (!isRefetch) {
          setStoreInitialData({
            profileData,
            userData,
          });
        }

        return true;
      } catch {
        storeUser({} as User);
        setStoreInitialData({} as OriginalData);
        return false;
      }
    },
    [storeUser, setStoreInitialData]
  );

  const updateUser = useCallback(async () => {
    try {
      const promises: Promise<AxiosResponse>[] = [];

      setError("");

      if (Object.keys(userData).length) {
        promises.push(api.patch("/users", userData));
      }

      if (Object.keys(profileData).length) {
        promises.push(api.patch("/profiles", profileData));
      }

      await Promise.all(promises);
      await fetchUser(true);

      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      return false;
    }
  }, [fetchUser, userData, profileData, setError]);

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
    updateUser,
    checkUsernameAvailability,
    fetchUser,
  };
}
