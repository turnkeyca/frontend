import React from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Icon } from "../../components/icon";
import { Picture } from "../../components/image";

export default function Profile(): any {
  return (
    <div>
      <Header
        title="My Turnkey"
        showEdit={true}
        showBack={true}
        showLogout={false}
      />
      <div className="p-2">
        <div className="grid grid-cols-3 gap-2 mb-2 tracking-wide">
          <div className="flex flex-col items-center">
            <Picture
              alt="profile picture"
              src="../../public/favicon-32x32.png"
            />
            <div className="tk-text-teal opacity-80 font-medium">Renter</div>
          </div>
          <div className="col-span-2 w-full">
            <div className="tk-text-blue text-lg font-medium">
              Hi, I'm Spongebob
            </div>
            <div className="tk-text-blue">Spongebob Squarepants</div>
            <div className="tk-text-blue">spongebob@squarepants.ca</div>
            <div className="tk-text-blue">123-456-7890</div>
            <div className="text-gray-600 text-sm">
              Who lives in a pineapple under the sea?
            </div>
          </div>
        </div>
        <div className="tk-text-blue tracking-wide">
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div className="flex items-center">
              <span className="mr-2">General information</span>
              <Icon name="error_outline" small={true} />
            </div>
            <Icon name="chevron_right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div className="flex items-center">
              <span className="mr-2">Lease information</span>
              <Icon name="error_outline" small={true} />
            </div>
            <Icon name="chevron_right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 border-b-0 p-2">
            <div className="flex items-center">
              <span className="mr-2">Employment information</span>
              <Icon name="error_outline" small={true} />
            </div>
            <Icon name="chevron_right" />
          </div>
          <div className="flex items-center justify-between border border-r-0 border-l-0 p-2">
            <div className="flex items-center">
              <span className="mr-2">Reference information</span>
              <Icon name="error_outline" small={true} />
            </div>
            <Icon name="chevron_right" />
          </div>
        </div>
      </div>
      <Footer showShareMyProfile={true} showProfile={true} />
    </div>
  );
}
