import Image from "next/image";
import { memo } from "react";
import { UserResultsProps } from "./types";
import Link from "next/link";

const BaseUserResults = ({ users }: Readonly<UserResultsProps>) => {
  if (users.length === 0) {
    return (
      <div>
        <h2>Usuários</h2>
        <span className="italic text-neutral-400 text-sm">
          Nenhum usuário encontrado
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2>Usuários</h2>
      <div>
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/profiles/${user.username}`}
            className="flex items-center gap-4 py-2 hover:bg-neutral-700 rounded-lg px-4"
          >
            <Image
              src={user.avatarUrl}
              width={50}
              height={50}
              alt={`Foto de ${user.name}`}
              className="rounded-full"
            />

            <div>
              <h3>{user.name}</h3>
              <span className="text-sm text-neutral-400">{user.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const UserResults = memo(BaseUserResults);
