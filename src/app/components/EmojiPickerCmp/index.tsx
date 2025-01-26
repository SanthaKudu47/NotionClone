"use client";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { MdOutlineDownloading } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import React, { useState } from "react";

import { v4 } from "uuid";
import { IoMdCloseCircle } from "react-icons/io";

function EmojiPickerCmp({
  setSelectedFile,
}: {
  setSelectedFile: (file: File | null) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  const [selectedUrl, setUrl] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<"init" | "start" | "done">("init");
  const handleEmojiPicker = function () {
    setOpen(!isOpen);
  };

  const createFileFromUrl = async function (url: string, fileName: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const blob = await response.blob();
      const extension = url.substring(url.lastIndexOf(".") + 1);
      console.log(fileName);
      const file = new File([blob], `${fileName}.${extension}`, {
        type: blob.type,
      });
      return file;
    } catch (error) {
      console.log("failed to create file from url");
      return null;
    }
  };

  const emojiClickHandler = async function (data: EmojiClickData) {
    console.log(data);
    const fileName = "workspace_emoji";
    const file = await createFileFromUrl(data.imageUrl, fileName);
    if (file) {
      setLoading("start");
      setSelectedFile(file);
      setUrl(data.imageUrl);
    }
    setLoading("done");
    handleEmojiPicker();
  };

  const closeHandler = function () {
    setLoading("init");
    setUrl(null);
    setSelectedFile(null);
  };

  return (
    <div className="flex relative">
      <div className="cursor-pointer justify-center items-center flex flex-row w-[40px] h-[40px] border-2 border-opacity-55 border-solid rounded-md border-washed-purple/washed-purple-700">
        {selectedUrl ? (
          <>
            {isLoading != "done" ? (
              <div className="animate-pulse">
                <MdOutlineDownloading />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 flex justify-center items-center -top-[80px]">
                  <IoMdCloseCircle
                    className="text-red-600 text-sm"
                    onClick={closeHandler}
                  />
                </div>
                <div>
                  <Image
                    alt="selected_emoji"
                    src={selectedUrl}
                    width={40}
                    height={40}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF0SURBVHgBrVM9rwFREB0bohU6DeIHUEi0JHQaBYVCSSMaP4BCSSL+AI0arYZGqZCoNEShYzfZZLPJFuft3GSv/dC8l3eSW+ydPWfPnJkNwQb9EYr/4nA4UKPRoGazSa/Xi/L5PHW7Xbrf70E2XBiNRuwCvV4P+/0ehmFgsVigWCyiUqnAD0kej8dIpVK4XC74BlVVMZvN8Hg8vOTn84lkMonlcikL/OVEIuERqNVqaLfbXvJms0E6nfa8+I3Md7FYDKZpiucw930+nymbzYoMNE2Th8WdoGxxKhQKtF6vKRqNftKOx+PkTIxJ5XKZ6vU6vd9vymQyNJ1ORc2yLLJdkh3kJ23HDofCuN1uog0u9/t9aXu73Xrak2nbtjEYDGSBBXh0buRyOQyHwyD5eDxCURRMJhP4YdsXIzydTtB1PUhm7HY7YYvPfD4XS9LpdERLrVYrIBp2b1u1WqXr9Uqr1UqmHIlERMKlUimwnSHgH3+M3+AHDOLOLFzeH6EAAAAASUVORK5CYII="
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="relative" onClick={handleEmojiPicker}>
            <MdOutlineFileUpload size={35} />
          </div>
        )}
      </div>
      <div className="absolute top-[45px] left-0">
        <EmojiPicker
          theme={Theme.DARK}
          open={isOpen}
          onEmojiClick={emojiClickHandler}
        />
      </div>
    </div>
  );
}

export default EmojiPickerCmp;
