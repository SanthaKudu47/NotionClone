"use client";
import ButtonMain from "@/app/components/button";
import { MouseEvent, MouseEventHandler, useContext, useState } from "react";
import mobileNavIcon from "../../../../../../public/mobile_nav_icon.png";
import Image from "next/image";
import { createClient } from "@/app/utils/superbase/clients";
import { GlobalContext } from "@/app/context/context";
import { redirect } from "next/navigation";
import Link from "next/link";

function ProfileModal({
  email,
  fullName,
  paymentMethod,
}: {
  email: string | null;
  fullName: string | null;
  paymentMethod: string | null;
}) {
  const [isOpen, setOpenState] = useState<boolean>(false);
  const { globalContext, addUser, removeUser } = useContext(GlobalContext);

  const clickHandler = function (event: MouseEvent<HTMLImageElement>) {
    setOpenState(!isOpen);
  };

  const signOutHandler = async function (event: MouseEvent<HTMLImageElement>) {
    const superbase = createClient();
    const { error } = await superbase.auth.signOut();
    if (error) return;
    removeUser();
    redirect("/signin");
  };

  return (
    <div className="w-full h-full flex flex-col border-opacity-65 rounded-md relative justify-center items-end">
      <div className="flex flex-row w-full cursor-pointer justify-start items-center">
        <Image
          src={mobileNavIcon}
          alt="mobile_icon"
          width={30}
          onClick={clickHandler}
        />
      </div>
      {isOpen && (
        <div className=" absolute top-[50px] bg-brand/brand-dark right-0 rounded-md flex flex-col justify-start gap-y-3 items-start border-opacity-65 p-3 border border-washed-purple/washed-purple-800">
          <div className="w-[40px] h-[40px] rounded-full border-2 border-solid border-washed-purple/washed-purple-800 cursor-pointer"></div>
          <span className="text-washed-purple/washed-purple-500">{email}</span>
          {fullName && <span>{fullName}</span>}
          {paymentMethod && <span>{paymentMethod}</span>}
          <span>
            <Link href={"/dashboard"}>Dashboard</Link>
          </span>
          <div className="flex flex-row justify-end w-full">
            <div className="inline-block" onClick={signOutHandler}>
              <ButtonMain type="v2" text="Sign Out" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileModal;
