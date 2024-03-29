import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { useEffect, useMemo, useState } from "react";
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
import { prependOnceListener } from "process";

export default function General(props) {
  const router = useRouter();
  let [
    [
      error,
      user,
      additionalDetailsGeneral,
      creditCheck,
      evicted,
      lawsuit,
      pets,
      smoker,
      userId,
    ],
    setState,
  ] = useState([
    undefined,
    undefined,
    undefined,
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
            u.additionalDetailsGeneral,
            u.creditCheck,
            u.evicted,
            u.lawsuit,
            u.pets,
            u.smoker,
            _userId,
          ]),
        error: (e) =>
          setState([
            e,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            _userId,
          ]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query, userApi]);

  function save(next: UrlObject) {
    let obs: Observable<void>;
    let body = user;
    body.additionalDetailsGeneral = additionalDetailsGeneral;
    body.creditCheck = creditCheck;
    body.evicted = evicted;
    body.lawsuit = lawsuit;
    body.pets = pets;
    body.smoker = smoker;
    obs = userApi.updateUser({
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
        title={props.header_text}
        showEdit={false}
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
                handleChange={($event) => {
                  setState([
                    error,
                    user,
                    additionalDetailsGeneral,
                    creditCheck,
                    evicted,
                    lawsuit,
                    pets,
                    $event.target.value === "true",
                    userId,
                  ])
                }
                }
                value={smoker}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been party to a lawsuit?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) =>
                  setState([
                    error,
                    user,
                    additionalDetailsGeneral,
                    creditCheck,
                    evicted,
                    $event.target.value === "true",
                    pets,
                    smoker,
                    userId,
                  ])
                }
                value={lawsuit}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Have you ever been evicted?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) =>
                  setState([
                    error,
                    user,
                    additionalDetailsGeneral,
                    creditCheck,
                    $event.target.value === "true",
                    lawsuit,
                    pets,
                    smoker,
                    userId,
                  ])
                }
                value={evicted}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Would you be willing to do a credit check?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) =>
                  setState([
                    error,
                    user,
                    additionalDetailsGeneral,
                    $event.target.value === "true",
                    evicted,
                    lawsuit,
                    pets,
                    smoker,
                    userId,
                  ])
                }
                value={creditCheck}
              />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Do you have any pets?</Label>
            <span className="text-gray-600 text-sm tracking-wide mb-1">
              <Toggle
                labelFalse="No"
                labelTrue="Yes"
                handleChange={($event) =>
                  setState([
                    error,
                    user,
                    additionalDetailsGeneral,
                    creditCheck,
                    evicted,
                    lawsuit,
                    $event.target.value === "true",
                    smoker,
                    userId,
                  ])
                }
                value={pets}
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
            <Label>Anything else you&#39;d like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  user,
                  $event.target.value,
                  creditCheck,
                  evicted,
                  lawsuit,
                  pets,
                  smoker,
                  userId,
                ])
              }
              value={additionalDetailsGeneral}
            />
          </div>
          <Button
            variant="secondary"
            handleClick={() =>
              save({
                pathname: props.next_action_path,
                query: router.query,
              })
            }
          >
            SAVE
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}

General.defaultProps = {
  header_text: "My Profile",
  next_action_path: "/renter/general"
}