import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Error,
  Footer,
  Header,
  Label,
  YesNo,
} from "../../../components";
import { UserApi } from "../../../generated-src/openapi";

export default function General() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const userApi = useMemo(() => new UserApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const _userId = router.query.userId as string;
    const sub = userApi
      .getUser({ id: _userId, token: router.query.token as string })
      .subscribe({
        next: (u) => setState([undefined, u, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, userApi]);
  return (
    <div>
      <Header
        router={router}
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
            <Label>Do you smoke?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo value={user?.smoker} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been party to a lawsuit?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo value={user?.lawsuit} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been evicted?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo value={user?.evicted} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Would you be willing to do a credit check?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <YesNo value={user?.creditCheck} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Do you have any pets?</Label>
            <span className="text-gray-600 text-sm tracking-wide mb-1">
              <YesNo value={user?.pets} />
            </span>
            <div>
              <Button
                handleClick={() =>
                  router.push({ pathname: "/renter/pet", query: { userId, token: router.query.token } })
                }
                variant="secondary"
              >
                View pet info
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.additionalDetailsGeneral}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
