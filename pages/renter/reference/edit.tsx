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
import { ReferenceApi, ReferenceDto } from "../../../generated-src/openapi";
import { useSession } from "next-auth/client";

export default function Reference() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [
    [
      error,
      additionalDetails,
      email,
      fullName,
      phoneNumber,
      relationship,
      referenceId,
    ],
    setState,
  ] = useState([undefined, "", "", "", "", "", undefined]);
  const referenceApi = useMemo(() => new ReferenceApi(), []);
  let userId = useRef("");
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    // if (!session) {
    //   router.push({ pathname: "/api/auth/signin" });
    //   return;
    // }
    userId.current = router.query.userId as string;
    let _referenceId = router.query.referenceId as string;
    const sub = referenceApi
      .getReference({ id: _referenceId, token: session.accessToken as string })
      .subscribe({
        next: (r) =>
          setState([
            undefined,
            r.additionalDetails,
            r.email,
            r.fullName,
            r.phoneNumber,
            r.relationship,
            _referenceId,
          ]),
        error: (e) => setState([e, "", "", "", "", "", _referenceId]),
      });
    return () => sub.unsubscribe();
  }, [
    router.isReady,
    router.query.referenceId,
    session,
    loading,
    referenceApi,
  ]);

  function save() {
    let obs: Observable<void>;
    let body = {
      userId: userId.current,
      additionalDetails,
      email,
      fullName,
      phoneNumber,
      relationship,
    } as ReferenceDto;
    if (referenceId) {
      obs = referenceApi.updateReference({
        id: referenceId,
        body,
        token: session.accessToken as string,
      });
    } else {
      obs = referenceApi.createReference({
        body,
        token: session.accessToken as string,
      });
    }
    obs.subscribe(() =>
      router.push({ pathname: "/renter/reference/view", query: router.query })
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
            Reference Info
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
                  additionalDetails,
                  email,
                  $event.target.value,
                  phoneNumber,
                  relationship,
                  referenceId,
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
                  additionalDetails,
                  $event.target.value,
                  fullName,
                  phoneNumber,
                  relationship,
                  referenceId,
                ])
              }
              value={email}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Phone number</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  additionalDetails,
                  email,
                  fullName,
                  $event.target.value,
                  relationship,
                  referenceId,
                ])
              }
              value={phoneNumber}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Relationship</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  additionalDetails,
                  email,
                  fullName,
                  phoneNumber,
                  $event.target.value,
                  referenceId,
                ])
              }
              value={relationship}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you&#39;d like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  $event.target.value,
                  email,
                  fullName,
                  phoneNumber,
                  relationship,
                  referenceId,
                ])
              }
              value={additionalDetails}
            />
          </div>
          <Button variant="secondary" handleClick={() => save()}>
            NEXT
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
