import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { Warning } from "../../../components/warning";
import { EmploymentApi } from "../../../generated-src/openapi";

export default function Employment() {
  const router = useRouter();
  let [[error, employments, userId], setState] = useState([
    undefined,
    undefined,
    undefined,
  ]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    setState([undefined, undefined, _userId]);
    const employmentApi = new EmploymentApi();
    let sub = employmentApi
      .getEmploymentsByUserId({ userId: _userId })
      .subscribe({
        next: (e) => setState([undefined, e, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady]);
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
        {employments !== undefined && employments.length === 0 && (
          <Warning>No employment records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {employments?.map((employment) => {
            <div
              className="p-3 border rounded shadow"
              onClick={() =>
                router.push({
                  pathname: "/renter/employment/view",
                  query: { userId, employmentId: employment.id },
                })
              }
            >
              <div className="tk-text-blue text-lg font-medium">
                {employment.employer}
              </div>
              <div className="tk-text-blue">{employment.occupation}</div>
              <div className="text-gray-600 text-sm">{employment.duration}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
