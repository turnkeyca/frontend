import { useSession, signIn } from "next-auth/client"
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Index() {
  const [session, loading] = useSession();
  if (!session) {
    signIn();
    return <div />;
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