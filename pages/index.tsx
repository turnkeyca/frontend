import { useSession, signIn } from "next-auth/client"
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { Button } from "../components"

export default function Index() {
  const [session, loading] = useSession();
  if (!session) {
    return <div>
      <Button variant="primary" handleClick={() => signIn()}>Sign in</Button>
    </div>;
  }
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    router.push('renter');
  }, [router.isReady]);
  return <div />;
}