'use client';

import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const error = useSearchParams().get('error');

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-black text-white">
      <h1>Login Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
