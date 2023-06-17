import React, { useEffect, useState } from "react";
import { PermissionApi, UserApi } from "../../generated-src/openapi";
import { useRouter } from "next/router";
import { Error, Footer, Header, Icon, MenuListOption } from "../../components";

export default function Renter() {
  const router = useRouter();
  let [[error, user, userId], setState] = useState([
    undefined,
    undefined,
    undefined
  ]);

  const [canEdit, setEdit] = useState(false);
  const [canView, setView] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let _userId = router.query.userId as string;
    const permissionApi = new PermissionApi();
    const perms = permissionApi
      .getPermissionsByUserId({ userId: _userId, token: router.query.token as string })
      .subscribe({
        next: (permList) => {
          permList.forEach(element => {
            if (element['onUserId'] == userId) {
              console.log(element)
              if (element['permission'] == "view") {
                setView(true)
                console.log(`Can View`)
              }
              else if (element['permission'] == "edit") {
                setEdit(true)
                console.log(`Can Edit`)
              }
            }
          });
        },
        error: (e) => setState([e, undefined, undefined])
      })
    return () => perms.unsubscribe();

  }, [router.isReady, router.query]);


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
        showEdit={canEdit}
        showBack={false}
        showLogout={true}
      />
      <div className="p-3">
        {!!error && <Error error={error} />}
        {!!user && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-3 tracking-wide">
              <div className="flex flex-col items-center">
                <div className="rounded-full h-36 w-36 flex items-center justify-center">
                  {/* {session && (
                    <div className="relative h-36 w-36">
                      <Image
                        className="rounded-full"
                        src={session.picture as string}
                        alt="profile picture"
                        layout="fill"
                      />
                    </div>
                  )} */}
                </div>
                <div className="tk-text-teal opacity-80 font-medium">
                  Renter
                </div>
              </div>
              <div className="col-span-2 w-full">
                <div className="tk-text-blue text-lg font-medium">
                  Hi, I&#39;m {user.nickname}
                </div>
                <div className="tk-text-blue">{user.fullName}</div>
                <div className="tk-text-blue">{user.email}</div>
                <div className="tk-text-blue">{user.phoneNumber}</div>
                <div className="text-gray-600 text-sm">{user.bio}</div>
              </div>
            </div>
            <div className="tk-text-blue tracking-wide">
              {/* Add Menu Options */}
              {menuOptions.map((option) =>
                <MenuListOption
                  handleClick={() =>
                    router.push({
                      pathname: option.url,
                      query: router.query,
                    })
                  }
                  displayText={option.text}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
