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
import { RoommateApi, RoommateDto } from "../../../generated-src/openapi";

export default function Roommate() {
  const router = useRouter();
  let [[error, roommate, roommateId], setState] = useState([
    undefined,
    {
      additionalDetails: "",
      email: "",
      fullName: "",
    } as RoommateDto,
    undefined,
  ]);
  const roommateApi = new RoommateApi();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _roommateId = router.query.roommateId as string;
    const sub = roommateApi.getRoommate({ id: _roommateId }).subscribe({
      next: (r) => setState([undefined, r, _roommateId]),
      error: (e) => setState([e, undefined, _roommateId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);

  function handleChange(
    $event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    if ($event) {
      $event.preventDefault();
    }
    roommate[$event.target.name] = $event.target.value;
    setState([error, roommate, roommateId]);
  }

  function save() {
    let obs: Observable<void>;
    if (roommateId) {
      obs = roommateApi.updateRoommate({
        id: roommateId,
        body: roommate,
      });
    } else {
      obs = roommateApi.createRoommate({ body: roommate });
    }
    obs.subscribe(() =>
      router.push({ pathname: "/renter/roommate/view", query: router.query })
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
              value={roommate.fullName}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={roommate.email}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
            <textarea
              className={TextInput}
              onChange={($event) => handleChange($event)}
              value={roommate.additionalDetails}
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
