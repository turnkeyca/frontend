import React from "react";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";

export default function Employment(): any {
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
      />
      <div className="p-2">
        <div className="flex items-center justify-center border border-t-0 border-l-0 border-r-0">
          <span className="tk-text-blue font-medium text-xl p-3">
            Employment Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Current employment
            </span>
            <span className="text-gray-600 text-sm tracking-wide">FCC</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Occupation</span>
            <span className="text-gray-600 text-sm tracking-wide">dev</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Length of current employment
            </span>
            <span className="text-gray-600 text-sm tracking-wide">3 years</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Annual salary</span>
            <span className="text-gray-600 text-sm tracking-wide">
              $100,000+
            </span>
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
      <Footer showShareMyProfile={true} showProfile={true} />
    </div>
  );
}
