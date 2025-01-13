"use client";

import { getUser } from "@/lib/superbase/db/queries";
import ProfileModal from "./modal";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/app/context/context";
import { createClient } from "@/app/utils/superbase/clients";
import Link from "next/link";
import ButtonMain from "../../button";

function UserProfile() {
  const { globalContext, addUser } = useContext(GlobalContext);
  const { isUserLoggedIn, user } = globalContext;
  const getLoggedUser = async function () {
    const superbase = createClient();
    const {
      data: { user },
      error,
    } = await superbase.auth.getUser();

    if (error) {
      console.log("Failed to fet logged user from uper base auth table");
      return;
    }

    if (!user) {
      console.log("There is no logged user");
      return;
    }
    //fetch from user table

    return await getUser(user.id);
  };

  useEffect(() => {
    getLoggedUser()
      .then((user) => {
        if (!user) return;

        const { email, fullName, paymentMethod } = user;
        console.log(email);
        addUser({
          email: email,
          fullName: fullName,
          paymentMethod: paymentMethod,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("Rendering Profile...");
  return (
    <>
      {isUserLoggedIn ? (
        <div className="flex flex-col items-center w-full h-full justify-center">
          {user ? (
            <ProfileModal
              email={user.email}
              fullName={user.fullName}
              paymentMethod={user.paymentMethod as string}
            />
          ) : (
            <>No specific user found...</>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex gap-x-4 items-center">
          <div>
            <span className="text-washed-purple/washed-purple-400 text-xs">
              <Link href={"/signin"}>Login</Link>
            </span>
          </div>
          <div className="">
            <Link href={"/signup"}>
              <div className="inline-block">
                <ButtonMain type="v2" text="Sign Up" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;

{
  /* <div className="block sm:hidden">
<GiHamburgerMenu
  className="text-brand/brand-washed-purple"
  size={35}
/>
</div>
<div className="flex flex-row relative w-full h-full">
<div className="flex flex-col">
  <ProfileModal
    email={user.email}
    fullName={user.fullName}
    paymentMethod={user.paymentMethod as string}
  />
</div>
</div> */
}
