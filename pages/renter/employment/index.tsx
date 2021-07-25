import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Error, Header, Icon, Warning } from "../../../components";
import { EmploymentApi } from "../../../generated-src/openapi";

export default function Employment() {
  const router = useRouter();
  let [[error, employments, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  const employmentApi = useMemo(() => new EmploymentApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    let sub = employmentApi
      .getEmploymentsByUserId({ userId: _userId })
      .subscribe({
        next: (e) => setState([undefined, e, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.userId, employmentApi]);
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={false}
        showBack={true}
        showLogout={false}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {employments !== undefined && employments.length === 0 && (
          <Warning>No employment records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {employments?.map((employment) => (
            <div
              key={employment.id}
              className="p-3 border rounded shadow cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="tk-text-blue text-lg font-medium">
                    {employment.employer}
                  </div>
                  <div className="tk-text-blue">{employment.occupation}</div>
                  <div className="text-gray-600 text-sm">
                    {employment.duration}
                  </div>
                </div>
                <div className="flex tk-text-blue">
                  <Icon
                    name="edit"
                    handleClick={() =>
                      router.push({
                        pathname: "/renter/employment/view",
                        query: { userId, employmentId: employment.id },
                      })
                    }
                  />
                  <Icon
                    className="mr-2"
                    name="delete"
                    handleClick={() =>
                      employmentApi
                        .deleteEmployment({ id: employment.id })
                        .subscribe()
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/employment/edit",
                query: router.query,
              })
            }
            variant="primary"
          >
            <Icon name="add"></Icon> ADD EMPLOYMENT
          </Button>
        </div>
      </div>
    </div>
  );
}
