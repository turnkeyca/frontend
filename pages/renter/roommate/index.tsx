import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { Warning } from "../../../components/warning";
import { RoommateApi } from "../../../generated-src/openapi";

export default function Roommate() {
  const router = useRouter();
  let [[error, roommates, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    setState([undefined, undefined, _userId]);
    const roommateApi = new RoommateApi();
    let sub = roommateApi.getRoommatesByUserId({ userId: _userId }).subscribe({
      next: (r) => setState([undefined, r, _userId]),
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
        {roommates !== undefined && roommates.length === 0 && (
          <Warning>No roommate records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {roommates?.map((roommate) => {
            <div
              className="p-3 border shadow"
              onClick={() =>
                router.push({
                  pathname: "/renter/roommate/view",
                  query: { userId, roommateId: roommate.id },
                })
              }
            >
              <div className="tk-text-blue text-lg font-medium">
                {roommate.fullName}
              </div>
              <div className="tk-text-blue">{roommate.email}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
