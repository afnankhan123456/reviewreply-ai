"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function GoogleSignInButtonInner({ className }: { className?: string }) {
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    const rawCallback = searchParams.get("callbackUrl");
    const safeCallback =
      rawCallback && rawCallback.startsWith("/") ? rawCallback : "/plans/basic/pricing";

    await signIn("google", {
      callbackUrl: safeCallback,
    });
  };

  return (
    <button onClick={handleLogin} className={className}>
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-4 h-4"
      />
      Continue with Google
    </button>
  );
}

export default function GoogleSignInButton({ className }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <button className={className} disabled>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </button>
      }
    >
      <GoogleSignInButtonInner className={className} />
    </Suspense>
  );
}
