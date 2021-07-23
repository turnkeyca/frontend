import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Error, Header, Warning } from "../../../components";
import { ReferenceApi } from "../../../generated-src/openapi";

export default function Reference() {
  const router = useRouter();
  let [[error, references, userId], setState] = useState([
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
    const referenceApi = new ReferenceApi();
    let sub = referenceApi
      .getReferencesByUserId({ userId: _userId })
      .subscribe({
        next: (r) => setState([undefined, r, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.userId]);
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
        {references !== undefined && references.length === 0 && (
          <Warning>No reference records found</Warning>
        )}
        <div className="grid grid-cols-1 gap-3">
          {references?.map((reference) => {
            <div
              className="p-3 border shadow"
              onClick={() =>
                router.push({
                  pathname: "/renter/reference/view",
                  query: { userId, referenceId: reference.id },
                })
              }
            >
              <div className="tk-text-blue text-lg font-medium">
                {reference.breed}
              </div>
              <div className="tk-text-blue">{reference.weight}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
