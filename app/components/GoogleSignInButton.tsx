"use client";
import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function GoogleSignInButtonInner({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
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
      {children ?? (
        <>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </>
      )}
    </button>
  );
}

export default function GoogleSignInButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <button className={className} disabled>
          {children ?? (
            <>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </>
          )}
        </button>
      }
    >
      <GoogleSignInButtonInner className={className}>{children}</GoogleSignInButtonInner>
    </Suspense>
  );
}
