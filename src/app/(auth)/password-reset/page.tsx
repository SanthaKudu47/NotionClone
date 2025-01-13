"use client";
import Image from "next/image";
import cypressLogo from "../../../../public/footer_logo.png";
import Link from "next/link";
import CustomInput from "@/app/components/input";
import { useActionState, useState } from "react";
import { resetPassword, signin } from "@/app/utils/actions/auth";
import { ResetFormState } from "@/lib/definitions";
import { TfiEmail } from "react-icons/tfi";

function formStateParser(state: ResetFormState) {
  let emailErr: string | undefined = undefined;
  let unspecificError: string | undefined = undefined;
  let isRequestSend: boolean = false;

  if (state) {
    const message = state.message;
    if (message === "Form Validation Error") {
      emailErr = state.errors?.email ? state.errors.email[0] : undefined;
    } else if (message === "Done") {
      isRequestSend = true;
    } else {
      unspecificError = message;
    }

    return {
      emailErr,
      isRequestSend,
      unspecificError,
    };
  } else {
    return {
      emailErr,
      isRequestSend,
      unspecificError,
    };
  }
}

function PasswordReset() {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    undefined
  );

  const { emailErr, isRequestSend, unspecificError } = formStateParser(state);
  const [email, setEmail] = useState<string>("");

  const emailHandler = function (value: string) {
    setEmail(value);
  };
  return (
    <div>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="bg-[#211F30] w-5/6 sm:w-1/3  text-white rounded-2xl  p-[2px] flex justify-center items-center">
          <div className="bg-brand/brand-dark rounded-2xl w-full h-full">
            <div className="flex flex-col justify-start py-5 px-5">
              <Image src={cypressLogo} alt="site_logo" width={100} />
              <span className="text-base font-semibold text-washed-purple/washed-purple-300">
                Forgot password
              </span>

              <span className="text-neutral/neutral-9 text-xs py-2">
                {!isRequestSend
                  ? "Enter your email address, and we'll send you instructions to securely reset your password."
                  : `Instructions sent to ${email} address`}
              </span>
              <div>
                {!isRequestSend && (
                  <form
                    action={formAction}
                    className="flex flex-col p-5 gap-y-4"
                  >
                    <CustomInput
                      id="email"
                      labelName="Email"
                      name="email"
                      placeHolderText="alice@express.com"
                      type="email"
                      onChange={emailHandler}
                      value={email}
                      isPending={isPending}
                      fieldError={emailErr}
                    />

                    <div className="relative pt-8">
                      <div
                        className={`text-white cursor-pointer relative  mx-auto justify-center items-center flex   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${"rounded-lg"}`}
                      >
                        <div
                          className={`${"rounded-lg"} flex text-washed-purple/washed-purple-300 text-xs sm:text-xs mx-auto my-auto w-full px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
                        >
                          <button className="w-full h-full" type="submit">
                            Send Instructions
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {isRequestSend && (
                  <div className="bg-primary-purple/primary-purple-700 p-3 m-2 flex-col  rounded-lg flex justify-center items-center">
                    <div className="flex flex-row items-center gap-x-4">
                      <TfiEmail />
                      Check Your Email
                    </div>
                    <span>An email confirmation has been Sent</span>
                  </div>
                )}

                {unspecificError && (
                  <div className="flex flex-row justify-center text-red-500">
                    {unspecificError}
                  </div>
                )}

                <div className="px-5 flex justify-end text-neutral/neutral-9 pt-2 relative pb-4">
                  Back to
                  <span className="text-washed-purple/washed-purple-300 px-1 cursor-pointer">
                    <Link href="/signin">
                      <u>Sign in</u>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default PasswordReset;
