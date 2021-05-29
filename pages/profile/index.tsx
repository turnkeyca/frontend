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
        <Header />
        Profile
        <Footer />
      </div>
    );
  }
}
