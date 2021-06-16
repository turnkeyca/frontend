import React from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Icon } from "../../components/icon";
import { Picture } from "../../components/image";

export default function Profile(): any {
  return (
    <div>
      <Header
        title="My Profile"
        showEdit={true}
        showBack={true}
        showLogout={false}
      />
      <div className="p-2">
        <div className="grid grid-cols-3 gap-2 mb-2 tracking-wide">
          <div className="flex flex-col items-center">
            <Picture src="../../public/favicon-32x32.png" />
            <div className="tk-text-blue">Renter</div>
          </div>
          <div className="colspan-2">
            <div className="tk-text-blue font-medium">Hi, I'm Spongebob</div>
            <div className="tk-text-blue text-sm">Spongebob Squarepants</div>
            <div className="tk-text-blue text-sm">spongebob@squarepants.ca</div>
            <div className="tk-text-blue text-sm">123-456-7890</div>
            <div className="text-gray-600 text-xs">
              Who lives in a pineapple under the sea?
            </div>
          </div>
        </div>
        <div className="tk-text-blue text-sm tracking-wide">
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div>
              <span className="mr-2">General information</span>
              <Icon name="exclamation-circle" />
            </div>
            <Icon name="chevron-right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div>
              <span className="mr-2">Lease information</span>
              <Icon name="exclamation-circle" />
            </div>
            <Icon name="chevron-right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div>
              <span className="mr-2">Employment information</span>
              <Icon name="exclamation-circle" />
            </div>
            <Icon name="chevron-right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 p-2">
            <div>
              <span className="mr-2">Reference information</span>
              <Icon name="exclamation-circle" />
            </div>
            <Icon name="chevron-right" />
          </div>
        </div>
      </div>
      <Footer showShareMyProfile={true} showProfile={true} />
    </div>
  );
}
