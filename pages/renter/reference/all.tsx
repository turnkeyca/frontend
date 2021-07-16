import { useRouter } from "next/router";
import React, { useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { ReferenceApi } from "../../../generated-src/openapi";

export default function Reference() {
  const referenceApi = new ReferenceApi();
  const router = useRouter();
  let [[error, references], setState] = useState([undefined, undefined]);
  const userId = router.query.userId as string;
  if (userId) {
    referenceApi.getReferencesByUserId({ userId }).subscribe({
      next: (r) => setState([undefined, r]),
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
          {references?.map((reference) => {
            <div className="p-3 border shadow">
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
