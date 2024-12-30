import React, { ReactNode } from "react";

function TitleSection({
  title = (
    <>
      All-In-One Collaboration and
      <br />
      Productivity Platform
    </>
  ),
  subTitle = "Your Workspace,Perfected",
}: {
  title: ReactNode;
  subTitle?: string;
}) {
  return (
    <div className="text-white flex flex-col relative">
      {subTitle && (
        <div className="flex justify-center py-[40px]  sm:py-[50px] lg:py-[65px]">
          <div className=" overflow-hidden flex relative rounded-full bg-gradient-to-l p-[1.5px] from-brand/brand-washed-blue to-brand/brand-primary-blue">
            <span className="rounded-full px-4 py-1 bg-black text-xs sm:text-xs text-washed-purple/washed-purple-300">
              {subTitle}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="text-washed-purple/washed-purple-300 leading-10 sm:leading-tight text-lg sm:text-xl text-center font-semibold">
          {title}
        </div>
      </div>
    </div>
  );
}

export default TitleSection;
