import React from "react";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";

export default class Roommate extends React.Component {
  render(): any {
    return (
      <div>
        <Header
          title="My Turnkey"
          showEdit={true}
          showBack={false}
          showLogout={true}
        />
        <div className="p-3"></div>
        <Footer showProfile={true} showConnections={true} />
      </div>
    );
  }
}
