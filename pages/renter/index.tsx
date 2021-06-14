import React from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header title="My Profile" showEdit={true} showBack={true} />
        Profile
        <Footer showConnections={true} showProfile={true} />
      </div>
    );
  }
}
