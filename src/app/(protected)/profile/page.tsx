'use client';

import {useUserStore} from "@/lib/zustand";

export default function ProfilePage() {
  const { user } = useUserStore();

  return (
      <div className="bg-black text-white w-screen min-h-screen">
        <header>
          <h2>
            {user.name}
          </h2>
        </header>
      </div>
  )
}