import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Error,
  Footer,
  Header,
  Label,
  YesNo,
} from "../../../components";
import { UserApi, UserDto } from "../../../generated-src/openapi";

export default function General() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    {
      additionalDetails: "",
      additionalDetailsLease: "",
      bio: "",
      city: "",
      creditCheck: false,
      email: "",
      evicted: false,
      fullName: "",
      id: "",
      lawsuit: false,
      monthlyBudgetMax: 0,
      monthlyBudgetMin: 0,
      moveInDate: "",
      moveOutDate: "",
      movingReason: "",
      nickname: "",
      password: "",
      pets: false,
      phoneNumber: "",
      propertyManagementCompany: "",
      province: "",
      roommates: false,
      securityDeposit: false,
      sendNotifications: false,
      smoker: false,
      userType: "",
    } as UserDto,
    undefined,
  ]);
  const userApi = useMemo(() => new UserApi(), []);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const _userId = router.query.userId as string;
    const sub = userApi.getUser({ id: _userId }).subscribe({
      next: (u) => setState([undefined, u, _userId]),
      error: (e) => setState([e, user, _userId]),
    });
    return () => sub.unsubscribe();
  }, [router.isReady, router.query.userId, userApi]);

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
            Lease Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Why are you looking for a place to live?</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.movingReason}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Will you be living with anyone?</Label>
            <YesNo value={user?.roommates} />
            <div>
              <Button
                handleClick={() =>
                  router.push({
                    pathname: "/renter/roommate",
                    query: { userId },
                  })
                }
                variant="secondary"
              >
                View roommate info
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <Label>Additional information</Label>
            <span className="text-gray-600 text-sm tracking-wide">
              {user?.additionalDetailsLease}
            </span>
          </div>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
