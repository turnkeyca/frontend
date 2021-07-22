import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Footer, Header, Label } from "../../../components";
import { RoommateApi } from "../../../generated-src/openapi";

export default function Roommate() {
  const router = useRouter();
  let [[error, roommate], setState] = useState([undefined, undefined]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _roommateId = router.query.roommateId as string;
    const roommateApi = new RoommateApi();
    const sub = roommateApi.getRoommate({ id: _roommateId }).subscribe({
      next: (r) => setState([undefined, r]),
      error: (e) => setState([e, undefined]),
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
            Employment Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Full name</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {roommate?.fullName}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {roommate?.email}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {roommate?.additionalDetails}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
