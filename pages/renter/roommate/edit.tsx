import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Error,
  Footer,
  Header,
  Label,
  TextInput,
} from "../../../components";
import { RoommateApi, RoommateDto } from "../../../generated-src/openapi";

export default function Roommate() {
  const router = useRouter();
  let [[error, roommate, email, fullName, roommateId], setState] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const roommateApi = useMemo(() => new RoommateApi(), []);
  let userId = useRef("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    userId.current = router.query.userId as string;
    let _roommateId = router.query.roommateId as string;
    if (!_roommateId) {
      return;
    }
    const sub = roommateApi
      .getRoommate({ id: _roommateId, token: router.query.token as string })
      .subscribe({
        next: (r) => setState([undefined, r, r.email, r.fullName, _roommateId]),
        error: (e) =>
          setState([e, undefined, undefined, undefined, _roommateId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, roommateApi]);

  function save() {
    let obs: Observable<void>;
    let body = roommate
      ? roommate
      : ({ userId: userId.current } as RoommateDto);
    body.email = email;
    body.fullName = fullName;
    if (roommateId) {
      obs = roommateApi.updateRoommate({
        id: roommateId,
        body,
        token: router.query.token as string,
      });
    } else {
      obs = roommateApi.createRoommate({
        body,
        token: router.query.token as string,
      });
    }
    obs.subscribe(() =>
      router.push({ pathname: "/renter/roommate", query: router.query })
    );
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
            Roommate Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Full name</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  roommate,
                  email,
                  $event.target.value,
                  roommateId,
                ])
              }
              value={fullName}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  roommate,
                  $event.target.value,
                  fullName,
                  roommateId,
                ])
              }
              value={email}
            />
          </div>
          <Button variant="secondary" handleClick={() => save()}>
            SAVE
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
