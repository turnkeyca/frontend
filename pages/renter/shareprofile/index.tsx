import React, { useEffect, useState } from "react";
import { ShorturlApi, UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Button, PulseLottie, CenteredImage } from "../../../components";

export default function Renter() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined
  ]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;

    const userApi = new UserApi();
    const sub = userApi
      .getUser({ id: _userId, token: router.query.token as string })
      .subscribe({
        next: (u) => setState([undefined, u, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();

  }, [router.isReady, router.query]);


  return (
    <div>
      <Header
        router={router}
        title="Share My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {!!user && (
          <div>
            <div className="w-full space-y-1.5 flex-col justify-center">
              <CenteredImage className="w-screen h-full" src="/assets/images/Turnkey_logo_colour.png" alt="turnkey logo" ></CenteredImage>
              <PulseLottie left={200} top={400} width={100} height={100} />
              <Button variant="secondary" className="w-full">Copy Link to Clipboard</Button>
              <Button variant="primary" className="w-full">Share Turnkey Profile</Button>
              <Button variant="tertiary" className="w-full">Download PDF</Button>
            </div>
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
