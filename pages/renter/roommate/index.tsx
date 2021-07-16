import { useRouter } from "next/router";
import React, { useState } from "react";
import { Error } from "../../../components/error";
import { Header } from "../../../components/header";
import { RoommateApi } from "../../../generated-src/openapi";

export default function Roommate() {
  const roommateApi = new RoommateApi();
  const router = useRouter();
  let [[error, roommates], setState] = useState([undefined, undefined]);
  const userId = router.query.userId as string;
  if (userId) {
    roommateApi.getRoommatesByUserId({ userId }).subscribe({
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
          {roommates?.map((roommate) => {
            <div className="p-3 border shadow">
              <div className="tk-text-blue text-lg font-medium">
                {roommate.fullName}
              </div>
              <div className="tk-text-blue">{roommate.email}</div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
