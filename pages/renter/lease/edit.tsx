import router from "next/router";
import React from "react";
import {
  Button,
  Footer,
  Header,
  Icon,
  Textarea,
  TextInput,
  Toggle,
} from "../../../components";

export default function EditLease() {
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
            Lease Info
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Are you able to pay a security deposit with your first months
              rent?
            </span>
            <Toggle labelTrue="Yes" labelFalse="No" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Will you be living with roommates?
            </span>
            <Toggle className="mb-1" labelTrue="Yes" labelFalse="No" />
            <Button variant="tertiary">
              <Icon name="add" />
              Add roommate
            </Button>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Why are you looking for a place to live?
            </span>
            <Textarea />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              When are you planning to move?
            </span>
            <TextInput />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              How long would you be planning to rent for?
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
