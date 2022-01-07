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
import { UserApi } from "../../../generated-src/openapi";

export default function EditLease() {
  const router = useRouter();
  let [
    [error, user, movingReason, roommates, additionalDetailsLease, userId],
    setState,
  ] = useState([
    undefined,
    undefined,
    undefined,
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
        next: (u) =>
          setState([
            undefined,
            u,
            u.movingReason,
            u.roommates,
            u.additionalDetailsLease,
            _userId,
          ]),
        error: (e) =>
          setState([e, undefined, undefined, undefined, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, userApi]);

  function save(next: UrlObject) {
    let body = user;
    body.movingReason = movingReason;
    body.roommates = roommates;
    body.additionalDetailsLease = additionalDetailsLease;
    const obs: Observable<void> = userApi.updateUser({
      id: userId,
      body,
      token: router.query.token as string,
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
                  user,
                  $event.target.value,
                  roommates,
                  additionalDetailsLease,
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
                  user,
                  movingReason,
                  $event.target.value === "true",
                  additionalDetailsLease,
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
                  user,
                  movingReason,
                  roommates,
                  $event.target.value,
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
