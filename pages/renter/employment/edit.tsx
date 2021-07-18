import router from "next/router";
import React from "react";
import {
  Button,
  Footer,
  Header,
  Textarea,
  TextInput,
} from "../../../components";
export default function EditEmployment() {
  return (
    <div>
      <Header
        showBack={true}
        showEdit={false}
        showLogout={false}
        title="Edit"
      />
      <div className="p-3">
        <div className="flex items-center justify-center">
          <span className="tk-text-blue font-medium text-xl p-3">
            Employment Info
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              What is your annual salary?
            </span>
            <TextInput />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Where are you currently employed?
            </span>
            <TextInput />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              What is your occupation?
            </span>
            <TextInput />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              How long have you been employed there?
            </span>
            <TextInput />
          </div>
          <div className="flex flex-col mb-3">
            <span className="text-gray-700 text-sm tracking-wide">
              Anything else you'd like to add?
            </span>
            <Textarea />
          </div>
          <Button
            variant="secondary"
            handleClick={() => router.push("/renter/edit")}
          >
            Update my profile
          </Button>
        </div>
      </div>
      <Footer showProfile={true} showConnections={true} />
    </div>
  );
}
