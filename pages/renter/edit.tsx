import { useRouter } from "next/router";
import React from "react";
import { Button, Footer, Header } from "../../components";

export default function EditRenter() {
  const router = useRouter();
  return (
    <div>
      <Header
        showEdit={false}
        showBack={true}
        showLogout={false}
        title="Edit Profile"
      />
      <div className="p-3">
        <div className="grid grid-cols-1 gap-1">
          <Button
            handleClick={() => router.push("/renter/contact/edit")}
            variant="tertiary"
          >
            Contact information
          </Button>
          <Button
            handleClick={() => router.push("/renter/employment")}
            variant="tertiary"
          >
            Employment information
          </Button>
          <Button
            handleClick={() => router.push("/renter/lease/edit")}
            variant="tertiary"
          >
            Lease information
          </Button>
          <Button
            handleClick={() => router.push("/renter/general/edit")}
            variant="tertiary"
          >
            General information
          </Button>
          <Button
            handleClick={() => router.push("/renter/reference")}
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
