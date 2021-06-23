import React from "react";
import { Button } from "../../../components/button";
import { Footer } from "../../../components/footer";
import { Header } from "../../../components/header";

export default function General(): any {
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
            General Info
          </span>
        </div>
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">Do you smoke?</span>
            <span className="text-gray-600 text-sm tracking-wide">No</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Have you ever been party to a lawsuit?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">No</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Have you ever been evicted?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">No</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Would you be willing to do a credit check?
            </span>
            <span className="text-gray-600 text-sm tracking-wide">No</span>
          </div>
          <div className="grid grid-cols-1 gap-1 border border-t-0 border-l-0 border-r-0 p-3">
            <span className="tk-text-blue tracking-wide">
              Do you have any pets?
            </span>
            <span className="text-gray-600 text-sm tracking-wide mb-1">No</span>
            <div>
              <Button className="" variant="secondary">
                View pet info
              </Button>
            </div>
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
