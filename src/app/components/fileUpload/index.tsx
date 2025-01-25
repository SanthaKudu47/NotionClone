"use client";

import React, { useState } from "react";

import "./styles.css";
import Image from "next/image";
import ImagePlaceHolder from "../../../../public/img_place_holder.svg";
import { IoMdCloseCircle } from "react-icons/io";

function FileUploadInput({
  setSelectedFile,
}: {
  setSelectedFile: (file: File | null) => void;
}) {
  const [selectedFile, setFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    if (files.length <= 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setFile(url);
    setFileName(file.name);
    setSelectedFile(file);
  };

  const closeHandler = function () {
    setFile(null);
    setFileName(null);
    setSelectedFile(null);
  };
  return (
    <div className="flex flex-col overflow-hidden">
      <label className=" text-washed-purple/washed-purple-300 font-semibold py-3 ">
        Workspace Logo
      </label>
      <div className="w-full border flex flex-row  justify-between items-center border-washed-purple/washed-purple-500 rounded-lg gap-x-1 overflow-hidden">
        <div className="py-2 px-1 border-r border-solid border-washed-purple/washed-purple-700 cursor-pointer flex shrink-0">
          <label htmlFor="file_upload" className="cursor-pointer">
            Select File
          </label>
        </div>
        <div className="flex flex-row justify-between w-full">
          <span className="px-2">
            {fileName === null ? "No File Chosen" : fileName}
          </span>
          {fileName && (
            <div className="inset-0 flex justify-center items-center text-[30px] cursor-pointer">
              <IoMdCloseCircle
                className="text-red-600"
                onClick={closeHandler}
              />
            </div>
          )}
        </div>

        <div className="border-l border-solid border-l-washed-purple/washed-purple-700 mr-1 relative flex px-2">
          <Image
            src={selectedFile === null ? ImagePlaceHolder : selectedFile}
            loading="lazy"
            alt="workspace_logo_preview"
            width={50}
            height={40}
          />
        </div>
        <input
          type="file"
          id="file_upload"
          hidden
          name="workspace_logo"
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
}

export default FileUploadInput;
