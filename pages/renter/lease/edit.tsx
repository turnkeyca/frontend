import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { useEffect, useMemo, useState } from "react";
import { UrlObject } from "url";
import {
  Button,
  Footer,
  Header,
  Error,
  Toggle,
  TextInput,
  Label,
} from "../../../components";
import { UserApi, UserDto } from "../../../generated-src/openapi";

export default function EditLease() {
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
      password,
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
    if (!router.isReady) {
      return;
    }
    const _userId = router.query.userId as string;
    const sub = userApi.getUser({ id: _userId }).subscribe({
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
          u.password,
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
  }, [router.isReady, router.query.userId, userApi]);

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
      password,
      pets,
      phoneNumber,
      roommates,
      securityDeposit,
      sendNotifications,
      smoker,
      userType,
      userStatusType: "active",
    } as UserDto;
    if (userId) {
      obs = userApi.updateUser({
        id: userId,
        body,
      });
    } else {
      obs = userApi.createUser({ body });
    }
    obs.subscribe(() => router.push(next));
  }
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Lease Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Why are you looking for a place to live?</Label>
            <textarea
              onChange={($event) =>
                setState([
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
                  $event.target.value,
                  nickname,
                  password,
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
              value={movingReason}
              className={TextInput}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Will you be living with anyone?</Label>
            <Toggle
              labelFalse="No"
              labelTrue="Yes"
              handleChange={($event) =>
                setState([
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
                  password,
                  pets,
                  phoneNumber,
                  $event.target.value === "true",
                  securityDeposit,
                  sendNotifications,
                  smoker,
                  userType,
                  userId,
                ])
              }
              value={roommates}
            />
            <div>
              <Button
                handleClick={() =>
                  save({
                    pathname: "/renter/roommate",
                    query: { userId },
                  })
                }
                variant="secondary"
              >
                View roommate info
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you&#39;d like to add?</Label>
            <textarea
              onChange={($event) =>
                setState([
                  error,
                  additionalDetailsGeneral,
                  $event.target.value,
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
                  password,
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
              value={additionalDetailsLease}
              className={TextInput}
            />
          </div>
          <Button
            variant="secondary"
            handleClick={() =>
              save({
                pathname: "/renter/lease",
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
