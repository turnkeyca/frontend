import React, { useEffect, useState } from "react";
import { ShorturlApi, UserApi } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Button } from "../../../components";

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
