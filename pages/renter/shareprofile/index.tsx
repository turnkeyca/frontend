import React, { useEffect, useState } from "react";
import { ShorturlApi, UserApi } from "../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Icon, MenuListOption, ShareableLink } from "../../components";
import { checkPermissions } from "../../utils";

export default function Renter() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined
  ]);

  const [canEdit, setEdit] = useState(false);
  const [canView, setView] = useState(false);
  useEffect(() => checkPermissions(router, setView, setEdit, setState));

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;

    const userApi = new UserApi();
    const sub = userApi
      .getUser({ id: _userId, token: router.query.token as string })
      .subscribe({
        next: (u) => setState([undefined, u, _userId]),
        error: (e) => setState([e, undefined, _userId]),
      });
    return () => sub.unsubscribe();

  }, [router.isReady, router.query]);

  let menuOptions = [
    {
      url: "/renter/general",
      text: "General Information",
    },
    {
      url: "/renter/contact",
      text: "Contact Information",
    },
    {
      url: "/renter/lease",
      text: "Lease Information",
    },
    {
      url: "/renter/employment",
      text: "Employment Information",
    },
    {
      url: "/renter/pet",
      text: "Pet Information",
    },
    {
      url: "/renter/reference",
      text: "Reference Infromation",
    },
    {
      url: "/renter/roommate",
      text: "Roommate Infromation",
    },
  ]
  return (
    <div>
      <Header
        router={router}
        title="My Turnkey"
        showEdit={false}
        showBack={true}
        showLogout={true}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {!!user && (
          <div>
            
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={false} />
    </div>
  );
}
