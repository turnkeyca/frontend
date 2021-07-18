import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Error, Footer, Header, YesNo } from "../../../components";
import { UserApi } from "../../../generated-src/openapi";

export default function General() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const _userId = router.query.userId as string;
    const userApi = new UserApi();
    const sub = userApi.getUser({ id: _userId }).subscribe({
      next: (u) => {
        setState([undefined, u, _userId]);
        console.log(u);
      },
      error: (e) => setState([e, undefined, _userId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            General Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Do you smoke?</span>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo val={user?.smoker} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Have you ever been party to a lawsuit?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo val={user?.lawsuit} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Have you ever been evicted?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo val={user?.evicted} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Would you be willing to do a credit check?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo val={user?.creditCheck} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Do you have any pets?
            </span>
            <span className="text-gray-600 text-sm tracking-wide mb-1">
              <YesNo val={user?.pets} />
            </span>
            <div>
              <Button
                handleClick={() =>
                  router.push({ pathname: "/renter/pet", query: { userId } })
                }
                variant="secondary"
              >
                View pet info
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Additional information
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.additionalDetails}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
