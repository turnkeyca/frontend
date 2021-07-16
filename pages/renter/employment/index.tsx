import { useRouter } from "next/router";
import React, { useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { EmploymentApi } from "../../../generated-src/openapi";

export default function Employment() {
  const employmentApi = new EmploymentApi();
  const router = useRouter();
  let [[error, employments], setState] = useState([undefined, undefined]);
  const userId = router.query.userId as string;
  if (userId) {
    employmentApi.getEmploymentsByUserId({ userId }).subscribe({
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
        <div className="grid grid-cols-1 gap-3">
          {employments?.map((employment) => {
            <div className="p-3 border shadow">
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
