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
import { UserApi } from "../../../generated-src/openapi";

export default function EditContact() {
  const router = useRouter();
  let [
    [
      error,
      user,
      userId,
      email,
      phoneNumber,
    ],
    setState,
  ] = useState([
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
            _userId,
            u.email,
            u.phoneNumber,
          ]),
        error: (e) =>
          setState([
            e,
            undefined,
            _userId,
            undefined,
            undefined,
          ]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, userApi]);

  function save(next: UrlObject) {
    let body = user;
    body.email = email;
    body.phoneNumber = phoneNumber;
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
                  user,
                  userId,
                  email,
                  phoneNumber,
                ])
              }
              value={email}
              className={TextInput}
            />
            <Label>Phone number</Label>
            <input
              type="text"
              onChange={($event) =>
                setState([
                  error,
                  user,
                  userId,
                  email,
                  phoneNumber,
                ])
              }
              value={phoneNumber}
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
