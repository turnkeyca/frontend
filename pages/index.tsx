import { useSession, signIn } from "next-auth/client"
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { Button } from "../components"

export default function Index() {
  const [session, _] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!session) {
      router.push('/api/auth/signin');
    }
    router.push('/renter');
  }, [router.isReady, session]);
  return (
    <div className="w-full flex items-center justify-center">
      <Button variant="primary" handleClick={() => signIn()}>Sign in</Button>
    </div>
  );
}