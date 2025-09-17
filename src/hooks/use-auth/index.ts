"use client";

import { api } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../use-user";

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { fetchUser } = useUser();

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
    fetchUser().then((success) => {
      setIsLoggedIn(success);
      setIsLoading(false);
    });
  }, [fetchUser]);

  return {
    googleLogin,
    githubLogin,
    logout,
    isLoading,
    isLoggedIn,
  };
}
