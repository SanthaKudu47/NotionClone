"use client";

import Image from "next/image";
import mobileMenuIcon from "../../../../../public/mobile_nav_icon.png";
import logoMobile from "../../../../../public/logo.png";
import { useState } from "react";
import Link from "next/link";
import { IoCloseCircleOutline } from "react-icons/io5";
function MobileNav() {
  const [isOpen, setOpen] = useState(false);
  const openHandler = function () {
    setOpen(!isOpen);
  };

  const closeHandler = function () {
    setOpen(false);
  };
  return (
    <div className="absolute  w-screen h-screen  top-[0px] left-0 flex flex-col ">
      <div className="flex flex-row w-full  h-[70px] justify-between items-center px-2  bg-brand/brand-dark shrink-0">
        <Image src={logoMobile} alt="cypress_logo_mobile" width={35} />
        <div onClick={openHandler}>
          <Image
            src={mobileMenuIcon}
            alt="menu_icon"
            width={30}
            className="cursor-pointer"
          />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col w-full h-full justify-between  bg-brand/brand-dark">
          <div className="flex flex-col w-full h-full items-end px-5">
            <ul className="text-xs flex flex-col gap-y-4 justify-between max-w-[800px] text-left">
              <li className="flex flex-row justify-end px-2 py-2 rounded-sm text-washed-purple/washed-purple-800 hover:text-washed-purple/washed-purple-200">
                <Link onClick={closeHandler} href={"#express"}>
                  Cypress
                </Link>
              </li>
              <li className="flex flex-row justify-end px-2 py-2 rounded-sm text-washed-purple/washed-purple-800 hover:text-washed-purple/washed-purple-200">
                <Link onClick={closeHandler} href={"#pricing"}>
                  Pricing
                </Link>
              </li>
              <li className="flex flex-row justify-end px-2 py-2 rounded-sm text-washed-purple/washed-purple-800 hover:text-washed-purple/washed-purple-200">
                <Link onClick={closeHandler} href={"#features"}>
                  Features
                </Link>
              </li>
              <li className="flex flex-row justify-end px-2 py-2 rounded-sm text-washed-purple/washed-purple-800 hover:text-washed-purple/washed-purple-200">
                <Link onClick={closeHandler} href={"#testimonials"}>
                  Testimonials
                </Link>
              </li>
              <li className="flex flex-row justify-end px-2 py-2 rounded-sm text-washed-purple/washed-purple-800 hover:text-washed-purple/washed-purple-200">
                <Link onClick={closeHandler} href={"#download"}>
                  Get Cypress
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-row justify-center items-center p-2  bg-brand/brand-dark">
            <IoCloseCircleOutline
              onClick={closeHandler}
              size={50}
              className="text-washed-purple/washed-purple-300 hover:text-washed-blue/washed-blue-50 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
