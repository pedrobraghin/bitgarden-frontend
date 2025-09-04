import {useReducer, useCallback, useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {useUser} from '@/hooks';
import {reducer, initialState} from './reducer'
import {useRouter} from "next/navigation";

export function useUsernameUpdate() {
  const router = useRouter();
  const {checkUsernameAvailability, updateUsername} = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdate = useCallback(async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      dispatch({type: 'RESET_FEEDBACK'});

      const updated = await updateUsername(state.username);

      if (updated) {
        dispatch({type: 'SET_UPDATED', payload: true});
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Não foi possível atualizar o nome de usuário. Tente novamente.',
        });
      }
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
      });
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  }, [state.username, updateUsername]);

  const debouncedCheck = useDebouncedCallback(
      async (value: string) => {
        dispatch({type: 'SET_USERNAME', payload: value});

        if (value.length >= 6) {
          const available = await checkUsernameAvailability(value);
          dispatch({type: 'SET_AVAILABLE', payload: available});
        } else {
          dispatch({type: 'SET_AVAILABLE', payload: null});
        }
      },
      500
  );

  useEffect(() => {
    if (state.isUpdated) {
      const timer = setTimeout(() => {
        router.replace(`/profiles/${state.username}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.isUpdated, state.username, router]);

  const isValidLength = state.username.length >= 6;

  return {
    ...state,
    isValidLength,
    handleUpdate,
    handleChange: (value: string) => debouncedCheck(value),
  };
}