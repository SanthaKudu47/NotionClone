import React, { ReactNode } from "react";

function Container({
  children,
  clxNames,
}: {
  children: ReactNode;
  clxNames?: string;
}) {
  return (
    <div className="w-full relative">
      <div
        className={`max-w-[350px] sm:max-w-[640px] md:max-w-[780px]  lg:max-w-[1280px]  mx-auto relative ${clxNames}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
