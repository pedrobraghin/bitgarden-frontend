'use client';

import { useUserStore } from '@/lib/zustand';
import { useUser } from '@/hooks';
import { useCallback, useState } from 'react';
import { debounce } from '@/utils';

export default function ProfilePage() {
  const { user } = useUserStore();
  const { checkUsernameAvailability, updateUsername } = useUser();
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const handleUpdateUsername = useCallback(async () => {
    updateUsername(username);
  }, [updateUsername, username]);

  return (
    <div className="p-10 flex flex-col gap-10">
      <header className="flex items-center">
        <div className="flex items-center gap-2">
          <h2>{user.name}</h2>
          <span className="text-sm opacity-50">{user.username}</span>
        </div>
      </header>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 w-max">
          <span>Atualizar nome de usuário</span>
          <input
            type="text"
            name="username"
            placeholder="ex.: joao123"
            value={username}
            minLength={6}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.length >= 6) {
                console.log('called');
                debounce(async () => {
                  console.log('called after bounce');
                  const available = await checkUsernameAvailability(
                    e.target.value
                  );
                  setUsernameAvailable(available);
                }, 300);
              }
            }}
            className="border-2 py-2 px-2 rounded-md w-full"
          />
          <button
            disabled={usernameAvailable || username.length < 6}
            onClick={handleUpdateUsername}
            className="border-2 p-4 cursor-pointer rounded-md disabled:opacity-40"
          >
            Atualizar
          </button>
          {!usernameAvailable && username.length >= 6 && (
            <span>Nome de usuário indisponível</span>
          )}
        </div>
      </div>
    </div>
  );
}
