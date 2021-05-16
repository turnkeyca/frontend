import React from "react";
import { Footer } from "../../components/profile/footer";
import { Header } from "../../components/profile/header";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header />
        Profile
        <Footer />
      </div>
    );
  }
}
