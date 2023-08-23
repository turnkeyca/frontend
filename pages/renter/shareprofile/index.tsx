import React, { useEffect, useState, useMemo } from "react";
import { AuthenticationApi, ShorturlApi, UserApi, RegisterTokenDto } from "../../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Button, MobileNotificationLottie, CenteredImage, TextField } from "../../../components";

export default function Renter() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined
  ]);

  let [[shortUrl], setURLState] = useState([
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

  useEffect(() => {
    // Generate the short url for sharing
    if (!router.isReady) {
      return;
    }

    // need to make a new token so that others can view the profile
    let _token =  router.query.token as string;
    let _userId = router.query.userId as string;

    var hostname = window.location.hostname
    if (hostname == 'localhost') {
      hostname = '127.0.0.1'
    }

    var base_url = `${window.location.protocol}//${hostname}`
    if (window.location.port !== '') {
      base_url = `${base_url}:${window.location.port}`
    }

    const urlApi = new ShorturlApi();
    const _url = `${base_url}/renter?userId=${_userId}&token=`
    const sub = urlApi
      .getShortUrl({ url: _url, token: _token })
      .subscribe({
        next: (u) => {
          setURLState([u['url']]);
        },
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
        {!!user && !!shortUrl && (
          <div className="flex-col">
            <CenteredImage className="w-64 h-24" src="/assets/images/Turnkey_logo_colour.png" alt="turnkey logo" ></CenteredImage>
            <p className="text-center tk-text-teal text-3xl font-semibold pt-5">Share your Turnkey Profile</p>
            <p className="text-center tk-text-blue text-medium text-medium pt-8 px-8 h-32">
              Copy your URL profile link & share it with landlords to apply for the perfect rental suite!
            </p>
            <MobileNotificationLottie left={200} top={400} width={250} height={250} />
            <div className="w-full h-32 space-y-1.5 flex-col justify-center">
              <TextField value={shortUrl} />
              <Button variant="secondary" className="w-full" handleClick={() => {
                navigator.clipboard.writeText(shortUrl)
              }}>Copy Link to Clipboard</Button>
              {/* <Button variant="primary" className="w-full">Share Turnkey Profile</Button> */}
              <Button variant="quaternary" className="w-full">Download PDF</Button>
              <Button
                variant="tertiary"
                className="w-full"
                handleClick={() => {
                  router.push({
                    pathname: "/renter/shareprofile/info/searchrental",
                    query: router.query,
                  })
                }
                }>How does this work?</Button>
            </div>
            <br /><br /><br /><br />
            <div className="w-full h-32 space-y-1.5 columns-1 justify-center">
              <p className="text-center tk-text-blue text-medium text-medium pt-8 px-8 h-32">
                This "COPY LINK TO KEYBOARD" feature feature is coming soon!
                <br /><br />
                Check out the "HOW DOES IT WORK?" to understand the Turnkey renter journey.
              </p>
            </div>
            <br /><br /><br /><br />
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
