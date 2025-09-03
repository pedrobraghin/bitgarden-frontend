'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from "@/hooks";
import {useCallback, useState, useEffect} from "react";
import {api} from "@/lib/api";

export default function LoginPage() {
  const error = useSearchParams().get('error');
  const router = useRouter();

  const { githubLogin, googleLogin, isLoading, isLoggedIn } = useAuth();

  const [response, setResponse] = useState<string>();


  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/feed')
    }
  }, [isLoggedIn, router]);

  const handleGetProfile = useCallback(async () => {
    const response = await api.get('/profile');
    setResponse(JSON.stringify(response.data, null, 2));
  }, []);

  if (isLoading) {
    return 'Loading...'; // change to spinner
  }

  if (isLoggedIn) {
    return 'Loading...'; // change to spinner
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-black text-white">
      <h1>Login Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4 items-center">
          <button
              onClick={githubLogin}
              className="cursor-pointer hover:bg-white hover:text-black transition-all px-6 py-2 rounded border-white border-2"
          >
            Github Login
          </button>

          <button
              onClick={googleLogin}
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
