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
import { EmploymentApi, EmploymentDto } from "../../../generated-src/openapi";

export default function Employment() {
  const router = useRouter();
  let [
    [
      error,
      employer,
      occupation,
      duration,
      annualSalary,
      additionalDetails,
      employmentId,
    ],
    setState,
  ] = useState([undefined, "", "", "", 0.0, "", undefined]);
  const employmentApi = useMemo(() => new EmploymentApi(), []);
  let userId = useRef("");
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    userId.current = _userId;
    let _employmentId = router.query.employmentId as string;
    if (!_employmentId) {
      return;
    }
    const sub = employmentApi.getEmployment({ id: _employmentId }).subscribe({
      next: (e) =>
        setState([
          undefined,
          e.employer,
          e.occupation,
          e.duration,
          e.annualSalary,
          e.additionalDetails,
          _employmentId,
        ]),
      error: (e) => setState([e, "", "", "", 0.0, "", _employmentId]),
    });
    return () => sub.unsubscribe();
  }, [
    router.isReady,
    router.query.userId,
    router.query.employmentId,
    employmentApi,
  ]);

  function save() {
    let obs: Observable<void>;
    let body = {
      employmentId,
      userId: userId.current,
      employer,
      occupation,
      duration,
      annualSalary,
      additionalDetails,
    } as EmploymentDto;
    if (employmentId) {
      obs = employmentApi.updateEmployment({
        id: employmentId,
        body,
      });
    } else {
      obs = employmentApi.createEmployment({ body });
    }

    obs.subscribe(() =>
      router.push({
        pathname: "/renter/employment",
        query: { userId: router.query.userId },
      })
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
            <Label>Current employment</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  $event.target.value,
                  occupation,
                  duration,
                  annualSalary,
                  additionalDetails,
                  employmentId,
                ])
              }
              value={employer}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Occupation</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  employer,
                  $event.target.value,
                  duration,
                  annualSalary,
                  additionalDetails,
                  employmentId,
                ])
              }
              value={occupation}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Length of current employment</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  employer,
                  occupation,
                  $event.target.value,
                  annualSalary,
                  additionalDetails,
                  employmentId,
                ])
              }
              value={duration}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Annual salary</Label>
            <input
              type="number"
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  employer,
                  occupation,
                  duration,
                  parseFloat($event.target.value),
                  additionalDetails,
                  employmentId,
                ])
              }
              value={annualSalary}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you&#39;d like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) =>
                setState([
                  error,
                  employer,
                  occupation,
                  duration,
                  annualSalary,
                  $event.target.value,
                  employmentId,
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
