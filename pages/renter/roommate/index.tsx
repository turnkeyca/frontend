import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Error, Header, Icon, Warning, Button, Footer } from "../../../components";
import { RoommateApi } from "../../../generated-src/openapi";

export default function Roommate() {
  const router = useRouter();
  let [[error, roommates, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const roommateApi = useMemo(() => new RoommateApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    let sub = roommateApi
      .getRoommatesByUserId({
        userId: _userId,
        token: router.query.token as string,
      })
      .subscribe({
        next: (r) => setState([undefined, r, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, roommateApi]);

  function delRoomate(roommateId) {
    roommateApi
      .deleteRoommate({
        id: roommateId,
        token: router.query.token as string,
      })
      .subscribe();

    router.push({
      pathname: "/renter/roommate",
      query: router.query,
    });
  }

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
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Roomate Info
          </span>
        </div>
        {roommates !== undefined && roommates.length === 0 && (
          <Warning>No roommate records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {roommates?.map((roommate) => (
            <div
              key={roommate.id}
              className="p-3 border shadow">
              <div className="flex justify-between items-center">
                <div
                  onClick={() =>
                    router.push({
                      pathname: "/renter/roommate/view",
                      query: { userId, token: router.query.token, roommateId: roommate.id },
                    })
                  }
                >
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
                        pathname: "/renter/roommate/edit",
                        query: { userId, token: router.query.token, roommateId: roommate.id },
                      })
                    }
                  />
                  <Icon
                    className="mr-2"
                    name="delete"
                    handleClick={() => delRoomate(roommate.id)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/roommate/edit",
                query: router.query,
              })
            }
            variant="primary"
          >
            <Icon name="add"></Icon> ADD ROOMMATE
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
