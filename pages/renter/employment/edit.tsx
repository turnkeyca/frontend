import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
  let [[error, employment, employmentId], setState] = useState([
    undefined,
    {
      userId: "",
      employer: "",
      occupation: "",
      duration: "",
      annualSalary: 0.0,
      additionalDetails: "",
    } as EmploymentDto,
    undefined,
  ]);
  const employmentApi = useMemo(() => new EmploymentApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    employment.userId = _userId;
    let _employmentId = router.query.employmentId as string;
    if (!_employmentId) {
      return;
    }
    const sub = employmentApi.getEmployment({ id: _employmentId }).subscribe({
      next: (u) => setState([undefined, u, _employmentId]),
      error: (e) => setState([e, employment, _employmentId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady, employment, router.query.employmentId, employmentApi]);

  function save() {
    let obs: Observable<void>;
    if (employmentId) {
      obs = employmentApi.updateEmployment({
        id: employmentId,
        body: employment,
      });
    } else {
      obs = employmentApi.createEmployment({ body: employment });
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
              onChange={($event) => {
                employment.employer = $event.target.value;
                setState([error, employment, employmentId]);
              }}
              name="employer"
              value={employment.employer}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Occupation</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => {
                employment.occupation = $event.target.value;
                setState([error, employment, employmentId]);
              }}
              name="occupation"
              value={employment.occupation}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Length of current employment</Label>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => {
                employment.duration = $event.target.value;
                setState([error, employment, employmentId]);
              }}
              name="duration"
              value={employment.duration}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Annual salary</Label>
            <input
              type="number"
              className={TextInput}
              onChange={($event) => {
                employment.annualSalary = parseFloat($event.target.value);
                setState([error, employment, employmentId]);
              }}
              name="annualSalary"
              value={employment.annualSalary}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Anything else you&#39;d like to add?</Label>
            <textarea
              className={TextInput}
              onChange={($event) => {
                employment.additionalDetails = $event.target.value;
                setState([error, employment, employmentId]);
              }}
              name="additionalDetails"
              value={employment.additionalDetails}
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
