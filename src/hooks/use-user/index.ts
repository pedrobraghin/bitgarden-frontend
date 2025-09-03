import { useCallback } from 'react';
import { api } from '@/lib/api';

export function useUser() {
  const updateUsername = useCallback(async (username: string) => {
    try {
      await api.patch('/profile', {
        username,
      });

      return true;
    } catch {
      return false;
    }
  }, []);

  const checkUsernameAvailability = useCallback(async (username: string) => {
    try {
      const { data } = await api.get(
        `/profile/username-availability/${username}`
      );

      return data.available;
    } catch {
      return false;
    }
  }, []);

  return {
    updateUsername,
    checkUsernameAvailability,
  };
}
