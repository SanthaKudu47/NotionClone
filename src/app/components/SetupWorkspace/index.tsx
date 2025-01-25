"use client";
import React, { useState } from "react";
import CustomInput from "../input";
import EmojiPickerCmp from "../EmojiPickerCmp";
import FileUploadInput from "../fileUpload";
import ButtonMain from "../button";
import {
  createWorkspace,
  workspaceInitDataType,
} from "@/app/utils/superbase/storage/createWorkspace";

type FieldErrors = {
  title: string | null;
  emoji: string | null;
  workspaceLogo: string | null;
};

function SetupWorkSpace({ userId }: { userId: string }) {
  const [isPending, setPending] = useState(false);
  const [data, setData] = useState<workspaceInitDataType>({
    title: null,
    emoji: null,
    workspaceLogo: null,
  });

  const [errors, setErrors] = useState<FieldErrors>({
    title: null,
    emoji: null,
    workspaceLogo: null,
  });

  const workspaceTitle = data.title ? data.title : "";

  const updateTitle = function (title: string) {
    const dataNew = { ...data };
    dataNew.title = title;
    setData(dataNew);
  };

  const updateEmoji = function (emoji: File|null) {
    const dataNew = { ...data };
    dataNew.emoji = emoji;
    setData(dataNew);
  };

  const updateLogo = function (logo: File|null) {
    const dataNew = { ...data };
    dataNew.workspaceLogo = logo;
    setData(dataNew);
  };

  const submit = async function () {
    const res = await createWorkspace(data);
    console.log(res);
  };

  return (
    <div className="flex flex-col w-full h-auto items-start md:items-center justify-start lg:w-[550px] px-2">
      <div className="text-washed-purple/washed-purple-500 py-2">
        <h3 className="text-washed-purple/washed-purple-50 text-base font-semibold">
          Create a Workspace
        </h3>

        <p className="text-washed-purple/washed-purple-800 text-wrap py-1">
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </p>

        <div className="pt-3">
          <div>
            <div className="w-full flex flex-col">
              <div className="flex flex-row items-end gap-x-3">
                <EmojiPickerCmp setSelectedFile={updateEmoji} />
                <div className="w-full">
                  <CustomInput
                    labelName="Name"
                    placeHolderText="Alex's Workplace"
                    isPending={false}
                    name="workspace_name"
                    value={workspaceTitle}
                    type="text"
                    fieldError=""
                    id="workspace_name"
                    onChange={(e) => {
                      updateTitle(e);
                    }}
                  />
                </div>
              </div>

              <div>
                <FileUploadInput setSelectedFile={updateLogo} />
              </div>
              <div className="flex flex-row w-full py-4 justify-end">
                <div className="inline-block" onClick={submit}>
                  <ButtonMain type="v2" text="Create Workspace" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupWorkSpace;
