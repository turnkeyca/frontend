import React from "react";
import { Button } from "../../../components/button";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";
import { Icon } from "../../../components/icon";
import { Picture } from "../../../components/image";

export default class Reference extends React.Component {
  render(): any {
    return (
      <div>
        <Header
          title="My Profile"
          showEdit={true}
          showBack={true}
          showLogout={false}
          onBackRoute="/renter"
          onEditRoute="/renter/reference/edit"
        />
        <div className="p-3">
          <div className="flex items-center justify-center">
            <span className="tk-text-blue font-medium text-xl p-3">
              Reference Info
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1 mb-3">
            <div className="border rounded p-1 shadow">
              <div className="grid grid-cols-3 gap-2 mb-2 tracking-wide">
                <div className="flex flex-col items-center">
                  <Picture
                    alt="profile picture"
                    src="../../public/favicon-32x32.png"
                  />
                </div>
                <div className="col-span-2 w-full flex ">
                  <div>
                    <div className="tk-text-blue text-lg font-medium">
                      Brooke Ham
                    </div>
                    <div className="tk-text-blue">brooke@ham.ca</div>
                    <div className="tk-text-blue">123-456-7890</div>
                    <div className="text-gray-600 text-sm">
                      Don't call in the mornings - she gets cranky.
                    </div>
                  </div>
                  <Icon
                    className="text-gray-700"
                    handleClick={() => alert("click")}
                    name="edit"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button variant="tertiary" className="flex items-center">
              <Icon name="add" small={true} />
              Add new reference
            </Button>
          </div>
        </div>
        <Footer showProfile={true} showShareMyProfile={true} />
      </div>
    );
  }
}
