import React, { useEffect, useState } from "react";
import { UserApi, UserDto } from "../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Icon } from "../../components";
import { useSession } from "next-auth/client";
import Image from "next/image";

export default function Renter() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    {
      additionalDetailsGeneral: "",
      additionalDetailsLease: "",
      bio: "",
      creditCheck: false,
      email: "",
      evicted: false,
      fullName: "",
      id: "",
      lawsuit: false,
      moveInDate: "",
      moveOutDate: "",
      movingReason: "",
      nickname: "",
      password: "",
      pets: false,
      phoneNumber: "",
      roommates: false,
      securityDeposit: false,
      sendNotifications: false,
      smoker: false,
      userType: "",
      userStatusType: "",
    } as UserDto,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    if (!session) {
      router.push({ pathname: "/api/auth/signin" });
      return;
    }
    let _userId = session.userId as string;
    const userApi = new UserApi();
    const sub = userApi
      .getUser({ id: _userId, token: session.accessToken as string })
      .subscribe({
        next: (u) => setState([undefined, u, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, session, loading]);
  return (
    <div>
      <Header
        router={router}
        title="My Turnkey"
        showEdit={true}
        showBack={false}
        showLogout={true}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {!!user && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3 tracking-wide">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-36 w-36 flex items-center justify-center">
                  {session && (
                    <div className="relative h-36 w-36">
                      <Image
                        className="rounded-full"
                        src={session.picture as string}
                        alt="profile picture"
                        layout="fill"
                      />
                    </div>
                  )}
                </div>
                <div className="tk-text-teal opacity-80 font-medium">
                  Renter
                </div>
              </div>
              <div className="col-span-2 w-full">
                <div className="tk-text-blue text-lg font-medium">
                  Hi, I&#39;m {user.nickname}
                </div>
                <div className="tk-text-blue">{user.fullName}</div>
                <div className="tk-text-blue">{user.email}</div>
                <div className="tk-text-blue">{user.phoneNumber}</div>
                <div className="text-gray-600 text-sm">{user.bio}</div>
              </div>
            </div>
            <div className="tk-text-blue tracking-wide">
              <div
                onClick={() =>
                  router.push({
                    pathname: "/renter/general",
                    query: { userId },
                  })
                }
                className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3"
              >
                <div className="flex items-center">
                  <span className="mr-1">General information</span>
                  <Icon name="error_outline" small={true} />
                </div>
                <Icon name="chevron_right" />
              </div>
              <div
                onClick={() =>
                  router.push({
                    pathname: "/renter/lease",
                    query: { userId },
                  })
                }
                className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3"
              >
                <div className="flex items-center">
                  <span className="mr-1">Lease information</span>
                  <Icon name="error_outline" small={true} />
                </div>
                <Icon name="chevron_right" />
              </div>
              <div
                onClick={() =>
                  router.push({
                    pathname: "/renter/employment",
                    query: { userId },
                  })
                }
                className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3"
              >
                <div className="flex items-center">
                  <span className="mr-1">Employment information</span>
                  <Icon name="error_outline" small={true} />
                </div>
                <Icon name="chevron_right" />
              </div>
              <div
                onClick={() =>
                  router.push({
                    pathname: "/renter/reference",
                    query: { userId },
                  })
                }
                className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 p-3"
              >
                <div className="flex items-center">
                  <span className="mr-1">Reference information</span>
                  <Icon name="error_outline" small={true} />
                </div>
                <Icon name="chevron_right" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
