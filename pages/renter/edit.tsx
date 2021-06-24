import React from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export default class Renter extends React.Component {
  render(): any {
    return (
      <div>
        <Header
          showEdit={false}
          showBack={true}
          showLogout={false}
          title="Edit Profile"
        />
        <div className="p-3"></div>
        <Footer showProfile={false} showConnections={false} />
      </div>
    );
  }
}
