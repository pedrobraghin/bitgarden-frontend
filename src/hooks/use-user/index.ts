import { useCallback } from "react";
import { api } from "@/lib/api";
import { OriginalData, useEditUserStore, useUserStore } from "@/lib/zustand";
import { User } from "@/@types";
import { AxiosResponse } from "axios";

export function useUser() {
  const { storeUser } = useUserStore();
  const { setStoreInitialData, profileData, userData, setErrors } =
    useEditUserStore();

  const fetchUser = useCallback(async () => {
    try {
      setErrors({ apiError: [] });

      const { data } = await api.get<User>("/users/me");

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
      setStoreInitialData({
        profileData,
        userData,
      });

      return true;
    } catch {
      storeUser({} as User);
      setStoreInitialData({} as OriginalData);
      setErrors({
        apiError: [
          "Error ao atualizar dados. Tente novamente em alguns segundos",
        ],
      });
      return false;
    }
  }, [storeUser, setStoreInitialData, setErrors]);

  const updateUser = useCallback(async () => {
    try {
      const promises: Promise<AxiosResponse>[] = [];

      if (Object.keys(userData).length) {
        promises.push(api.patch("/users", userData));
      }

      if (Object.keys(profileData).length) {
        promises.push(api.patch("/profiles", profileData));
      }

      await Promise.all(promises);
      await fetchUser();

      return true;
    } catch {
      return false;
    }
  }, [fetchUser, userData, profileData]);

  return {
    updateUser,
    fetchUser,
  };
}
