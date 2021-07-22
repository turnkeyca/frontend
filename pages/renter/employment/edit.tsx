import { useRouter } from "next/router";
import { Observable } from "rxjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Error, Footer, Header, TextInput } from "../../../components";
import { EmploymentApi, EmploymentDto } from "../../../generated-src/openapi";

export default function Employment() {
  const router = useRouter();
  let [[error, employment, employmentId], setState] = useState([
    undefined,
    {
      employer: "",
      occupation: "",
      duration: "",
      annualSalary: 0.0,
      additionalDetails: "",
    } as EmploymentDto,
    undefined,
  ]);
  const employmentApi = new EmploymentApi();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _employmentId = router.query.employmentId as string;
    if (!_employmentId) {
      return;
    }
    const sub = employmentApi.getEmployment({ id: _employmentId }).subscribe({
      next: (u) => setState([undefined, u, _employmentId]),
      error: (e) => setState([e, employment, _employmentId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady]);

  function handleChange(
    $event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    if ($event) {
      $event.preventDefault();
    }
    employment[$event.target.name] = $event.target.value;
    setState([error, employment, employmentId]);
  }

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
        query: router.query,
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
            <span className="tk-text-blue tracking-wide">
              Current employment
            </span>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              name="employer"
              value={employment.employer}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Occupation</span>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              name="occupation"
              value={employment.occupation}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Length of current employment
            </span>
            <input
              type="text"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              name="duration"
              value={employment.duration}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Annual salary</span>
            <input
              type="number"
              className={TextInput}
              onChange={($event) => handleChange($event)}
              name="annualSalary"
              value={employment.annualSalary}
            />
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Anything else you'd like to add?
            </span>
            <textarea
              className={TextInput}
              onChange={($event) => handleChange($event)}
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
