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
  Toggle,
} from "../../../components";
import { UserApi, UserDto } from "../../../generated-src/openapi";
import { UrlObject } from "url";

export default function General() {
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
  const userApi = new UserApi();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const _userId = router.query.userId as string;
    const sub = userApi.getUser({ id: _userId }).subscribe({
      next: (u) => setState([undefined, u, _userId]),
      error: (e) => setState([e, user, _userId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);

  function handleChange(
    $event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    if ($event) {
      $event.preventDefault();
    }
    user[$event.target.name] = $event.target.value;
    setState([error, user, userId]);
  }

  function save(next: UrlObject) {
    user.userStatusType = "active";
    let obs: Observable<void>;
    if (userId) {
      obs = userApi.updateUser({
        id: userId,
        body: user,
      });
    } else {
      obs = userApi.createUser({ body: user });
    }
    obs.subscribe(() => router.push(next));
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
            General Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Do you smoke?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) => handleChange($event)}
                value={user.smoker}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been party to a lawsuit?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) => handleChange($event)}
                value={user.lawsuit}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been evicted?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) => handleChange($event)}
                value={user.evicted}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Would you be willing to do a credit check?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) => handleChange($event)}
                value={user.creditCheck}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Do you have any pets?</Label>
            <span className="text-gray-600 text-sm tracking-wide mb-1">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) => handleChange($event)}
                value={user.pets}
              />
            </span>
            <div>
              <Button
                handleClick={() =>
                  save({ pathname: "/renter/pet", query: { userId } })
                }
                variant="secondary"
              >
                View pet info
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you'd like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) => handleChange($event)}
              name="additionalDetails"
              value={user.additionalDetailsGeneral}
            />
          </div>
          <Button
            variant="secondary"
            handleClick={() =>
              save({
                pathname: "/renter/general",
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
