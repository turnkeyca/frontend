import React from "react";
import { Footer, Header } from "../../../components";

export default function EditPet() {
  return (
    <div>
      {/* <Header
        showEdit={false}
        showBack={true}
        showLogout={false}
        title="Edit Profile"
      /> */}
      <div className="p-3"></div>
      <Footer showProfile={false} showConnections={false} />
    </div>
  );
}
