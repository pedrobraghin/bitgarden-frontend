'use client';

import Link from "next/link";

export default function Home() {


  return (
      <div className="w-screen h-screen flex bg-black text-white">
        <Link href="/login">
          Fazer login
        </Link>
      </div>
  );
}
