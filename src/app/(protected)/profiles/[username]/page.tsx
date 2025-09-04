'use client';

import {useUserStore} from '@/lib/zustand';

import Link from "next/link";
import {UpdateUsername} from "@/components";

export default function ProfilePage() {
  const {user} = useUserStore();

  return (
      <div className="p-10 flex flex-col gap-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2>{user.name}</h2>
            <span className="text-sm opacity-50">{user.username}</span>
          </div>
          <div>
            <Link href="/">Início</Link>
          </div>
        </header>
        <div className="flex flex-col gap-5">
          <UpdateUsername/>
        </div>
      </div>
  );
}
