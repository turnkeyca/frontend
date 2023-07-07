import React, { useEffect, useState } from "react";
import { ShorturlApi, UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Button, MobileNotificationLottie, CenteredImage, TextField } from "../../../components";

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
            <CenteredImage className="w-64 h-24" src="/assets/images/Turnkey_logo_colour.png" alt="turnkey logo" ></CenteredImage>
            <p className="text-center tk-text-teal text-3xl font-semibold pt-5">Share your Turnkey Profile</p>
            <p className="text-center tk-text-blue text-medium text-medium pt-8 px-8 h-32">
              Copy your URL profile link & share it with landlords to apply for the perfect rental suite!
            </p>
            <MobileNotificationLottie left={200} top={400} width={250} height={250} />
            <div className="w-full h-32 space-y-1.5 flex-col justify-center">
              <Button variant="secondary" className="w-full">Copy Link to Clipboard</Button>
              <Button variant="primary" className="w-full">Share Turnkey Profile</Button>
              <Button variant="quaternary" className="w-full">Download PDF</Button>
              <Button variant="tertiary" className="w-full">How does this work?</Button>
            </div>
            <br/><br/>
            <div className="w-full h-32 space-y-1.5 flex-col justify-center">
            <p className="text-center tk-text-blue text-medium text-medium pt-8 px-8 h-32">
              This "COPY LINK TO KEYBOARD" feature feature is coming soon!
              <br/><br/>
              Check out the "HOW DOES IT WORK?" to understand the Turnkey renter journey.
            </p>
            </div>
            <br/><br/><br/><br/>
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
