import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Error, Footer, Header, Label } from "../../../components";
import { UserApi } from "../../../generated-src/openapi";

export default function General() {
  const router = useRouter();
  let [[error, user], setState] = useState([
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
        next: (u) => setState([undefined, u]),
        error: (e) => setState([e, user]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, userApi, user]);

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
            Contact Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.email}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Phone number</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
