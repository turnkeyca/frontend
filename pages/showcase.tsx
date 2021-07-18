import React from "react";
import {
  Button,
  CurrencyInput,
  Footer,
  Header,
  Label,
  NToggle,
  PhoneNumberInput,
  Select,
  SelectOption,
  ShareableLink,
  Spinner,
  Textarea,
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
            <TextInput placeholder="Placeholder" className="w-64" />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Currency
          </span>
          <div className="flex justify-center items-center m-4">
            <CurrencyInput placeholder="$2,000.00" className="w-64" />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Phone number
          </span>
          <div className="flex justify-center items-center m-4">
            <PhoneNumberInput placeholder="123-456-7890" className="w-64" />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Textarea
          </span>
          <div className="flex justify-center items-center m-4">
            <Textarea placeholder="Placeholder" className="w-64" />
          </div>
        </div>
        <div className="flex flex-col tk-bg-grey border border-b-0 border-gray-400">
          <span className="text-sm font-light tracking-wide m-3 tk-text-blue">
            Select
          </span>
          <div className="flex justify-center items-center m-4">
            <Select className="w-64">
              <SelectOption>This is an option</SelectOption>
            </Select>
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
        <span className="text-sm font-light tracking-wide m-3 tk-text-blue">Calendar</span>
        <div className="flex justify-center items-center">
          <Calendar />
        </div>
      </div> */}
        {/* <div className="flex flex-col">
        <span className="text-sm font-light tracking-wide m-3 tk-text-blue">Duration</span>
        <div className="flex justify-center items-center">
          <Duration />
        </div>
      </div> */}
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
