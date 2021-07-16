import { useRouter } from "next/router";
import React, { useState } from "react";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";
import { Error } from "../../../components/error";
import { EmploymentApi, UserApi } from "../../../generated-src/openapi";

export default function Employment() {
  const employmentApi = new EmploymentApi();
  const router = useRouter();
  let [[error, employment], setState] = useState([undefined, undefined]);
  const employmentId = router.query.employmentId as string;
  if (employmentId) {
    employmentApi.getEmployment({ id: employmentId }).subscribe({
      next: (e) => setState([undefined, e]),
      error: (e) => setState([e, undefined]),
    });
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
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Occupation</span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Length of current employment
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Annual salary</span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Additional information
            </span>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
