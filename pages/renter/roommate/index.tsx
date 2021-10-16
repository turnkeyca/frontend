import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Error, Header, Icon, Warning } from "../../../components";
import { RoommateApi } from "../../../generated-src/openapi";

export default function Roommate() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [[error, roommates, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const roommateApi = useMemo(() => new RoommateApi(), []);
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    // if (!session) {
    //   router.push({ pathname: "/api/auth/signin" });
    //   return;
    // }
    let _userId = router.query.userId as string;
    let sub = roommateApi
      .getRoommatesByUserId({
        userId: _userId,
        token: session.accessToken as string,
      })
      .subscribe({
        next: (r) => setState([undefined, r, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.userId, roommateApi]);
  return (
    <div>
      <Header
        router={router}
        title="My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {roommates !== undefined && roommates.length === 0 && (
          <Warning>No roommate records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {roommates?.map((roommate) => (
            <div
              key={roommate.id}
              className="p-3 border shadow"
              onClick={() =>
                router.push({
                  pathname: "/renter/roommate/view",
                  query: { userId, roommateId: roommate.id },
                })
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="tk-text-blue text-lg font-medium">
                    {roommate.fullName}
                  </div>
                  <div className="tk-text-blue">{roommate.email}</div>
                </div>
                <div className="flex tk-text-blue">
                  <Icon
                    name="edit"
                    handleClick={() =>
                      router.push({
                        pathname: "/renter/employment/view",
                        query: { userId, roommateId: roommate.id },
                      })
                    }
                  />
                  <Icon
                    className="mr-2"
                    name="delete"
                    handleClick={() =>
                      roommateApi
                        .deleteRoommate({
                          id: roommate.id,
                          token: session.accessToken as string,
                        })
                        .subscribe()
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
