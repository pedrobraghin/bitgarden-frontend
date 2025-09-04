'use client';

import {useUsernameUpdate} from "@/components/update-username/use-username-update";

export function UpdateUsername() {
  const {
    username,
    isAvailable,
    isUpdated,
    error,
    loading,
    isValidLength,
    handleChange,
    handleUpdate,
  } = useUsernameUpdate();

  return (
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 w-max">
            <label htmlFor="username" className="font-medium">
              Atualizar nome de usuário
            </label>

            <input
                id="username"
                type="text"
                name="username"
                placeholder="ex.: joao123"
                minLength={6}
                autoComplete="off"
                defaultValue={username}
                onChange={(e) => handleChange(e.target.value)}
                className="border-2 py-2 px-2 rounded-md w-full"
            />

            <button
                disabled={!isValidLength || !isAvailable || loading}
                onClick={handleUpdate}
                className="border-2 p-4 cursor-pointer rounded-md disabled:opacity-40 flex items-center justify-center"
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </button>

            {isValidLength && isAvailable === false && (
                <span className="text-red-500 text-sm">
                Nome de usuário indisponível
              </span>
            )}
          </div>

          {isUpdated && (
              <div className="text-green-600 font-medium">
                Nome de usuário atualizado!
              </div>
          )}

          {error && <div className="text-red-500 font-medium">{error}</div>}
        </section>
      </div>
  );
}