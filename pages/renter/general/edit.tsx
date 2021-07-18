import router from "next/router";
import React from "react";
import {
  Button,
  Footer,
  Header,
  Icon,
  Textarea,
  Toggle,
} from "../../../components";

export default function EditGeneral() {
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
            General Info
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Do you smoke?
            </span>
            <Toggle labelTrue="Yes" labelFalse="No" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Have you ever been party to a lawsuit?
            </span>
            <Toggle labelTrue="Yes" labelFalse="No" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Have you ever been evicted?
            </span>
            <Toggle labelTrue="Yes" labelFalse="No" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Will you be willing to do a credit check?
            </span>
            <Toggle labelTrue="Yes" labelFalse="No" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm tracking-wide">
              Do you have any pets?
            </span>
            <Toggle className="mb-1" labelTrue="Yes" labelFalse="No" />
            <Button variant="tertiary">
              <Icon name="add" />
              Add pet
            </Button>
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
