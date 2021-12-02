import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Footer, Header, Label } from "../../../components";
import { ReferenceApi } from "../../../generated-src/openapi";

export default function Reference() {
  const router = useRouter();
  let [[error, reference], setState] = useState([undefined, undefined]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _referenceId = router.query.referenceId as string;
    const referenceApi = new ReferenceApi();
    const sub = referenceApi
      .getReference({ id: _referenceId, token: router.query.token as string })
      .subscribe({
        next: (r) => setState([undefined, r]),
        error: (e) => setState([e, undefined]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.referenceId]);
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
            Reference Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Full name</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {reference?.fullName}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Email</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {reference?.email}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Phone number</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {reference?.phoneNumber}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Relationship</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {reference?.relationship}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {reference?.additionalDetails}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
