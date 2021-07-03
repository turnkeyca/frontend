import React from "react";
import Link from "next/link";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Icon } from "../../components/icon";
import { Picture } from "../../components/image";
import { UserApi, UserDto } from "../../generated-src/openapi";
import { useRouter } from "next/router";

export default function Renter() {
  let user: UserDto;
  let error: Error;
  const userApi = new UserApi();
  const router = useRouter();
  const userId = router.query.userId as string;
  console.log(userId);
  if (userId) {
    userApi.getUser({ id: userId }).subscribe({
      next: (u) => (user = u),
      error: (e) => (error = e),
    });
  }
  return (
    <div>
      <Header
        title="My Turnkey"
        showEdit={true}
        showBack={false}
        showLogout={true}
      />
      <div className="p-3">
        {/* {!!error || (
          <div className="bg-red-200 rounded border border-red-600">
            {error.message}
          </div>
        )} */}
        <div className="grid grid-cols-3 gap-3 mb-3 tracking-wide">
          <div className="flex flex-col items-center">
            <Picture alt="profile picture" src="/favicon-32x32.png" />
            <div className="tk-text-teal opacity-80 font-medium">Renter</div>
          </div>
          <div className="col-span-2 w-full">
            <div className="tk-text-blue text-lg font-medium">
              Hi, I'm {user?.nickname}
            </div>
            <div className="tk-text-blue">{user?.fullName}</div>
            <div className="tk-text-blue">{user?.email}</div>
            <div className="tk-text-blue">{user?.phoneNumber}</div>
            <div className="text-gray-600 text-sm">{user?.bio}</div>
          </div>
        </div>
        <div className="tk-text-blue tracking-wide">
          <Link href="/renter/general">
            <div className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3">
              <div className="flex items-center">
                <span className="mr-1">General information</span>
                <Icon name="error_outline" small={true} />
              </div>
              <Icon name="chevron_right" />
            </div>
          </Link>
          <Link href="/renter/lease">
            <div className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3">
              <div className="flex items-center">
                <span className="mr-1">Lease information</span>
                <Icon name="error_outline" small={true} />
              </div>
              <Icon name="chevron_right" />
            </div>
          </Link>
          <Link href="/renter/employment">
            <div className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 border-b-0 p-3">
              <div className="flex items-center">
                <span className="mr-1">Employment information</span>
                <Icon name="error_outline" small={true} />
              </div>
              <Icon name="chevron_right" />
            </div>
          </Link>
          <Link href="/renter/reference">
            <div className="flex items-center justify-between cursor-pointer border border-r-0 border-l-0 p-3">
              <div className="flex items-center">
                <span className="mr-1">Reference information</span>
                <Icon name="error_outline" small={true} />
              </div>
              <Icon name="chevron_right" />
            </div>
          </Link>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
