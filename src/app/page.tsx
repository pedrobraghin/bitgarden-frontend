'use client';

import { api } from '@/lib/api';
import { useCallback, useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState<string>();

  const handleGithubLogin = useCallback(async () => {
    window.location.href = 'http://localhost:8081/api/v1/auth/github';
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    window.location.href = 'http://localhost:8081/api/v1/auth/google';
  }, []);

  const handleGetProfile = useCallback(async () => {
    const response = await api.get('/profile');
    setResponse(JSON.stringify(response.data, null, 2));
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleGithubLogin}
            className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Github Login
          </button>

          <button
            onClick={handleGoogleLogin}
            className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Google Login
          </button>

          <button
            onClick={handleGetProfile}
            className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Get profile
          </button>
        </div>
        <pre className="mt-4 text-left max-w-2xl whitespace-pre-wrap">
          {response ?? 'No profile data'}
        </pre>
      </div>
    </div>
  );
}
