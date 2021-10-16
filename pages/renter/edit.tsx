import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Footer, Header } from "../../components";

export default function EditRenter() {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady || loading) {
      return;
    }
    // if (!session) {
    //   router.push({ pathname: "/api/auth/signin" });
    //   return;
    // }
  }, [router.isReady, session, loading]);
  return (
    <div>
      <Header
        router={router}
        showEdit={false}
        showBack={true}
        showLogout={false}
        title="Edit Profile"
      />
      <div className="p-3">
        <div className="grid grid-cols-1 gap-1">
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/contact/edit",
                query: router.query,
              })
            }
            variant="tertiary"
          >
            Contact information
          </Button>
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/employment",
                query: router.query,
              })
            }
            variant="tertiary"
          >
            Employment information
          </Button>
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/lease/edit",
                query: router.query,
              })
            }
            variant="tertiary"
          >
            Lease information
          </Button>
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/general/edit",
                query: router.query,
              })
            }
            variant="tertiary"
          >
            General information
          </Button>
          <Button
            handleClick={() =>
              router.push({
                pathname: "/renter/reference",
                query: router.query,
              })
            }
            variant="tertiary"
          >
            Reference information
          </Button>
          <Button
            handleClick={() => router.push("/account/edit")}
            variant="tertiary"
          >
            Change password
          </Button>
        </div>
      </div>
      <Footer showProfile={false} showConnections={false} />
    </div>
  );
}
