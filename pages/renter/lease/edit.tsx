import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { UrlObject } from "url";
import {
  Button,
  Footer,
  Header,
  Error,
  Toggle,
  TextInput,
} from "../../../components";
import { UserApi, UserDto } from "../../../generated-src/openapi";

export default function EditLease() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    {
      additionalDetails: "",
      additionalDetailsLease: "",
      bio: "",
      city: "",
      creditCheck: false,
      email: "",
      evicted: false,
      fullName: "",
      id: "",
      lawsuit: false,
      monthlyBudgetMax: 0,
      monthlyBudgetMin: 0,
      moveInDate: "",
      moveOutDate: "",
      movingReason: "",
      nickname: "",
      password: "",
      pets: false,
      phoneNumber: "",
      propertyManagementCompany: "",
      province: "",
      roommates: false,
      securityDeposit: false,
      sendNotifications: false,
      smoker: false,
      userType: "",
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
            Lease Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Why are you looking for a place to live?
            </span>
            <textarea
              onChange={($event) => handleChange($event)}
              value={user.movingReason}
              className={TextInput}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Will you be living with anyone?
            </span>
            <Toggle
              labelFalse="No"
              labelTrue="Yes"
              handleChange={($event) => handleChange($event)}
              value={user.roommates}
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
            <span className="tk-text-blue tracking-wide">
              Additional information
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {user.additionalDetailsLease}
            </span>
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
