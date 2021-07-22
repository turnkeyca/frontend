import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Error,
  Footer,
  Header,
  Label,
  TextInput,
} from "../../../components";
import { ReferenceApi, ReferenceDto } from "../../../generated-src/openapi";

export default function Reference() {
  const router = useRouter();
  let [[error, reference, referenceId], setState] = useState([
    undefined,
    {
      additionalDetails: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      relationship: "",
    } as ReferenceDto,
    undefined,
  ]);
  const referenceApi = new ReferenceApi();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _referenceId = router.query.referenceId as string;
    const sub = referenceApi.getReference({ id: _referenceId }).subscribe({
      next: (r) => setState([undefined, r, _referenceId]),
      error: (e) => setState([e, undefined, _referenceId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);

  function handleChange(
    $event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    if ($event) {
      $event.preventDefault();
    }
    reference[$event.target.name] = $event.target.value;
    setState([error, reference, referenceId]);
  }

  function save() {
    let obs: Observable<void>;
    if (referenceId) {
      obs = referenceApi.updateReference({
        id: referenceId,
        body: reference,
      });
    } else {
      obs = referenceApi.createReference({ body: reference });
    }
    obs.subscribe(() =>
      router.push({ pathname: "/renter/reference/view", query: router.query })
    );
  }

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
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Employment Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Full name</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={reference.fullName}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={reference.email}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Phone number</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={reference.phoneNumber}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Relationship</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={reference.relationship}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you'd like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={reference.additionalDetails}
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
