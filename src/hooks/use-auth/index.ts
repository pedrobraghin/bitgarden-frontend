import { api } from '@/lib/api';
import { useCallback } from 'react';

export function useAuth() {
  const getOAuthUrl = useCallback(async (provider: string) => {
    const response = await api.get('/auth/oauth-url', {
      params: {
        provider,
      },
    });

    return response.data.url;
  }, []);

  const githubLogin = useCallback(async () => {
    const url = await getOAuthUrl('github');
    window.location.href = url;
  }, [getOAuthUrl]);

  const googleLogin = useCallback(async () => {
    const url = await getOAuthUrl('google');
    window.location.href = url;
  }, [getOAuthUrl]);

  return {
    googleLogin,
    githubLogin,
  };
}
