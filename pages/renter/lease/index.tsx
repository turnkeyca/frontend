import React from "react";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";

export default class Lease extends React.Component {
  render(): any {
    return (
      <div>
        <Header
          title="My Profile"
          showEdit={true}
          showBack={true}
          showLogout={false}
        />
        <div className="p-3">
          <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
            <span className="tk-text-blue font-medium text-xl p-3">
              Lease Info
            </span>
          </div>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
              <span className="tk-text-blue tracking-wide">
                Why are you looking for a place to live?
              </span>
              <span className="text-gray-600 text-sm tracking-wide">
                Because my parents threw me out
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
              <span className="tk-text-blue tracking-wide">
                Will you be living with anyone else?
              </span>
              <span className="text-gray-600 text-sm tracking-wide">No</span>
            </div>
            <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
              <span className="tk-text-blue tracking-wide">
                When is your preferred move in date?
              </span>
              <span className="text-gray-600 text-sm tracking-wide">
                tomorrow
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
              <span className="tk-text-blue tracking-wide">
                Are you able to pay the security deposit with your first month's
                rent?
              </span>
              <span className="text-gray-600 text-sm tracking-wide">Yes</span>
            </div>
            <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
              <span className="tk-text-blue tracking-wide">
                Additional information
              </span>
              <span className="text-gray-600 text-sm tracking-wide">
                Well this one time out at the farm my buddies and I weeeehooo
              </span>
            </div>
          </div>
        </div>
        <Footer
          showProfile={true}
          showConnections={true}
        />
      </div>
    );
  }
}
