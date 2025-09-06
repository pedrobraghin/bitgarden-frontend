import { api } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/@types";
import { useUserStore } from "@/lib/zustand";

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setUser: storeUser } = useUserStore();

  const getUser = useCallback(async () => {
    try {
      const { data } = await api.get("/user");
      setUser(data);
      storeUser(data);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, [storeUser, setIsLoggedIn]);

  const getOAuthUrl = useCallback(async (provider: string) => {
    const response = await api.get("/auth/oauth-url", {
      params: {
        provider,
      },
    });

    return response.data.url;
  }, []);

  const githubLogin = useCallback(async () => {
    window.location.href = await getOAuthUrl("github");
  }, [getOAuthUrl]);

  const googleLogin = useCallback(async () => {
    window.location.href = await getOAuthUrl("google");
  }, [getOAuthUrl]);

  const logout = useCallback(async () => {
    setIsLoggedIn(false);
    await api.get("/auth/logout");
  }, []);

  useEffect(() => {
    void getUser();
  }, [getUser]);

  return {
    googleLogin,
    githubLogin,
    logout,
    isLoading,
    isLoggedIn,
    getUser,
    user,
  };
}
