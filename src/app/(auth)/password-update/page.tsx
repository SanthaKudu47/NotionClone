"use client";

import CustomInput from "@/app/components/input";
import Image from "next/image";
import Link from "next/link";
import cypressLogo from "../../../../public/footer_logo.png";
import { useEffect, useState } from "react";
import { createClient } from "@/app/utils/superbase/clients";
import { useSearchParams } from "next/navigation";
import { TfiEmail } from "react-icons/tfi";

function PasswordUpdate() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const error_code = searchParams.get("error_code");
  const error_description = searchParams.get("error_description");
  const code = searchParams.get("code");
  const [isLoggedIn, setLoggedInStatus] = useState(false);
  const superbase = createClient();

  const [newPassword, setNewPassword] = useState("");

  const changePassword = async function (password: string) {
    if (code) {
      try {
        const { data, error } = await superbase.auth.updateUser({
          password: password,
          nonce: code,
        });

        if (error) {
          console.log("Error", error.message);
        } else {
          console.log("DDD", data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    superbase.auth.onAuthStateChange(async (event, session) => {
      if (event == "SIGNED_IN") {
        setLoggedInStatus(true);
      }
    });
  }, []);

  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="bg-[#211F30] w-5/6 sm:w-1/3  text-white rounded-2xl  p-[2px] flex justify-center items-center">
          <div className="bg-brand/brand-dark rounded-2xl w-full h-full">
            <div className="flex flex-col justify-start py-5 px-5">
              <Image src={cypressLogo} alt="site_logo" width={100} />
              <span className="text-base font-semibold text-washed-purple/washed-purple-300 pt-3">
                {isLoggedIn ? "You are authenticated." : "Update Password"}
              </span>

              {!error && isLoggedIn && (
                <div>
                  <form
                    action={(e: FormData) => {
                      changePassword(e.get("password") as string);
                    }}
                    className="flex flex-col p-5 gap-y-4"
                  >
                    <CustomInput
                      id="password"
                      labelName="New Password"
                      name="password"
                      placeHolderText="abc@12345"
                      type="password"
                      onChange={(value) => {
                        setNewPassword(value);
                      }}
                      value={newPassword}
                      isPending={false}
                      fieldError={""}
                    />

                    <div className="relative pt-8">
                      <div
                        className={`text-white cursor-pointer relative  mx-auto justify-center items-center flex   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${"rounded-lg"}`}
                      >
                        <div
                          className={`${"rounded-lg"} flex text-washed-purple/washed-purple-300 text-xs sm:text-xs mx-auto my-auto w-full px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
                        >
                          <button className="w-full h-full" type="submit">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="px-5 flex justify-end text-neutral/neutral-9 pt-2 relative pb-4">
                    Back to
                    <span className="text-washed-purple/washed-purple-300 px-1 cursor-pointer">
                      <Link href="/signin">
                        <u>Sign in</u>
                      </Link>
                    </span>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-primary-purple/primary-purple-700 p-3 m-2 flex-col  rounded-lg flex justify-center items-center">
                  <div className="flex flex-row items-center gap-x-4">
                    <TfiEmail />
                    Error
                  </div>
                  <span>{error_description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default PasswordUpdate;
