import React, { useEffect, useState } from "react";
import { UserApi } from "../../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Header, Button, CenteredImage } from "../../../../components";

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
            <p className="text-center tk-text-teal text-3xl font-semibold pt-5">Next...</p>
            <p className="text-center tk-text-blue text-medium text-medium pt-8 px-8 h-32">
              Find a property that you like and messages the landlord on this listing platform.
            </p>
            <div className="flex flex-col space-y-4 h-80">
              <CenteredImage src="/assets/images/rental_url_share.png" className="w-80 h-full"></CenteredImage>
              <CenteredImage src="/assets/images/default_user_icon.png" className="w-80 h-full"></CenteredImage>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              handleClick={() => {
                router.push({
                  pathname: "/renter/shareprofile/info/sharelink",
                  query: router.query,
                })
              }
              }>THEN WHAT?</Button>
          </div>
        )}
      </div>
    </div>
  );
}
