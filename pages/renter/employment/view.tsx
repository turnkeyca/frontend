import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Footer, Header } from "../../../components";
import { EmploymentApi } from "../../../generated-src/openapi";

export default function Employment() {
  const router = useRouter();
  let [[error, employment], setState] = useState([undefined, undefined]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _employmentId = router.query.employmentId as string;
    const employmentApi = new EmploymentApi();
    const sub = employmentApi.getEmployment({ id: _employmentId }).subscribe({
      next: (u) => setState([undefined, u]),
      error: (e) => setState([e, undefined]),
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
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Occupation</span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.occupation}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Length of current employment
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.duration}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Annual salary</span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.annualSalary}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Additional information
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.additionalDetails}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
