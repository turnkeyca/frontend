import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Footer, Header, Label } from "../../../components";
import { EmploymentApi } from "../../../generated-src/openapi";

export default function Employment() {
  const [session, loading] = useSession();
  const router = useRouter();
  let [[error, employment], setState] = useState([undefined, undefined]);
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    if (!session) {
      router.push({ pathname: "/api/auth/signin" });
      return;
    }
    let _employmentId = router.query.employmentId as string;
    const employmentApi = new EmploymentApi();
    const sub = employmentApi
      .getEmployment({
        id: _employmentId,
        token: session.accessToken as string,
      })
      .subscribe({
        next: (u) => setState([undefined, u]),
        error: (e) => setState([e, undefined]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, session, loading, router.query.employmentId]);
  return (
    <div>
      <Header
        router={router}
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
        editSamePath={true}
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
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.employer}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Occupation</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.occupation}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Length of current employment</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.duration}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Annual salary</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {employment?.annualSalary}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
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
