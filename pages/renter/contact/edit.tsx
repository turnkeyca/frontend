import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { useEffect, useMemo, useState } from "react";
import { UrlObject } from "url";
import {
  Button,
  Footer,
  Header,
  Error,
  TextInput,
  Label,
} from "../../../components";
import { UserApi, UserDto } from "../../../generated-src/openapi";
import { useSession } from "next-auth/client";

export default function EditContact() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [
    [
      error,
      additionalDetailsGeneral,
      additionalDetailsLease,
      bio,
      creditCheck,
      email,
      evicted,
      fullName,
      lawsuit,
      moveInDate,
      moveOutDate,
      movingReason,
      nickname,
      pets,
      phoneNumber,
      roommates,
      securityDeposit,
      sendNotifications,
      smoker,
      userType,
      userId,
    ],
    setState,
  ] = useState([
    undefined,
    "",
    "",
    "",
    false,
    "",
    false,
    "",
    false,
    "",
    "",
    "",
    "",
    false,
    "",
    false,
    false,
    false,
    false,
    "",
    undefined,
  ]);
  const userApi = useMemo(() => new UserApi(), []);
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    // if (!session) {
    //   router.push({ pathname: "/api/auth/signin" });
    //   return;
    // }
    const _userId = router.query.userId as string;
    const sub = userApi
      .getUser({ id: _userId, token: session.accessToken as string })
      .subscribe({
        next: (u) =>
          setState([
            undefined,
            u.additionalDetailsGeneral,
            u.additionalDetailsLease,
            u.bio,
            u.creditCheck,
            u.email,
            u.evicted,
            u.fullName,
            u.lawsuit,
            u.moveInDate,
            u.moveOutDate,
            u.movingReason,
            u.nickname,
            u.pets,
            u.phoneNumber,
            u.roommates,
            u.securityDeposit,
            u.sendNotifications,
            u.smoker,
            u.userType,
            _userId,
          ]),
        error: (e) =>
          setState([
            e,
            "",
            "",
            "",
            false,
            "",
            false,
            "",
            false,
            "",
            "",
            "",
            "",
            false,
            "",
            false,
            false,
            false,
            false,
            "",
            _userId,
          ]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, session, loading, userApi]);

  function save(next: UrlObject) {
    let obs: Observable<void>;
    let body = {
      additionalDetailsGeneral,
      additionalDetailsLease,
      bio,
      creditCheck,
      email,
      evicted,
      fullName,
      lawsuit,
      moveInDate,
      moveOutDate,
      movingReason,
      nickname,
      pets,
      phoneNumber,
      roommates,
      securityDeposit,
      sendNotifications,
      smoker,
      userType,
      userStatusType: "active",
    } as UserDto;
    obs = userApi.updateUser({
      id: userId,
      body,
      token: session.accessToken as string,
    });
    obs.subscribe(() => router.push(next));
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
            Contact Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <input
              type="text"
              onChange={($event) =>
                setState([
                  error,
                  additionalDetailsGeneral,
                  additionalDetailsLease,
                  bio,
                  creditCheck,
                  $event.target.value,
                  evicted,
                  fullName,
                  lawsuit,
                  moveInDate,
                  moveOutDate,
                  movingReason,
                  nickname,
                  pets,
                  phoneNumber,
                  roommates,
                  securityDeposit,
                  sendNotifications,
                  smoker,
                  userType,
                  userId,
                ])
              }
              value={email}
              className={TextInput}
            />
          </div>
          <Button
            variant="secondary"
            handleClick={() =>
              save({
                pathname: "/renter/contact",
                query: router.query,
              })
            }
          >
            NEXT
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
