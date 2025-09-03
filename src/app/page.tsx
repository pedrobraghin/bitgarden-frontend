'use client';

import Link from "next/link";
import {useAuth} from "@/hooks";

export default function Home() {
  const {logout, isLoggedIn, user, isLoading} = useAuth()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
        <div>
          <Link href="/login">
            Fazer login
          </Link>
        </div>
    )
  }

  return (
      <div>
        <div className="flex items-center justify-start gap-5">
          <button onClick={logout} className="cursor-pointer">Sair</button>
          <Link href={`/profiles/${user?.username}`}>
            Perfil
          </Link>
        </div>
      </div>
  );
}
