import React from "react";
import {
  Button,
  Footer,
  Header,
  Label,
  NToggle,
  Select,
  ShareableLink,
  Spinner,
  TextInput,
  Toggle,
} from "../components";

export default function Showcase() {
  return (
    <div>
      <Header
        showLogout={false}
        showBack={false}
        showEdit={false}
        title="Showcase"
      ></Header>
      <div className="flex flex-col m-8">
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Buttons
          </span>
          <div className="flex flex-col justify-center items-center m-4">
            <Button
              handleClick={() => alert("primary!")}
              variant="primary"
              className="mb-3"
            >
              Primary button
            </Button>
            <Button
              handleClick={() => alert("secondary!")}
              variant="secondary"
              className="mb-3"
            >
              Secondary button
            </Button>
            <Button handleClick={() => alert("tertiary!")} variant="tertiary">
              Tertiary button
            </Button>
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Label
          </span>
          <div className="flex justify-center items-center m-4">
            <Label>Label</Label>
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Shareable link
          </span>
          <div className="flex justify-center items-center m-4">
            <ShareableLink />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Text
          </span>
          <div className="flex justify-center items-center m-4">
            <input
              type="text"
              placeholder="Placeholder"
              className={"w-64 ".concat(TextInput)}
            />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Textarea
          </span>
          <div className="flex justify-center items-center m-4">
            <textarea
              placeholder="Placeholder"
              className={"w-64 ".concat(TextInput)}
            />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Select
          </span>
          <div className="flex justify-center items-center m-4">
            <select className={"w-64 ".concat(Select)}>
              <option>This is an option</option>
              <option>This is another option</option>
              <option>This is a third option</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Binary Toggle
          </span>
          <div className="flex justify-center items-center m-4">
            <Toggle labelTrue="True" labelFalse="False" />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            N-Toggle
          </span>
          <div className="flex justify-center items-center m-4">
            <NToggle
              labels={
                new Map([
                  ["Value 1", "primary"],
                  ["Value 2", "secondary"],
                  ["Value 3", "tertiary"],
                ])
              }
            />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Spinner
          </span>
          <div className="flex justify-center items-center m-4">
            <Spinner />
          </div>
        </div>
        {/* <div className="flex flex-col">
        <span className="text-sm font-light tracking-wide m-3 tk-text-blue">Picture</span>
        <div className="flex justify-center items-center">
          <PictureUpload />
        </div>
      </div> */}
        {/* <div className="flex flex-col">
        <span className="text-sm font-light tracking-wide m-3 tk-text-blue">Progress bar</span>
        <div className="flex justify-center items-center">
          <ProgressBar />
        </div>
      </div> */}
      </div>
      <Footer showProfile={true} showConnections={true}></Footer>
    </div>
  );
}
