"use client";
import Image from "next/image";
import cypressLogo from "../../../../public/footer_logo.png";
import CustomInput from "@/app/components/input";
import Link from "next/link";
import { signup } from "@/app/utils/actions/auth";
import { useActionState, useState } from "react";
import { FormState } from "@/lib/definitions";
import { TfiEmail } from "react-icons/tfi";

function formStateParser(state: FormState) {
  let emailErr: string | undefined = undefined;
  let passwordErr: string | undefined = undefined;
  let isFormContainErrors = false;
  let isNewAccountCreated = false;
  let unspecificError: string | undefined = undefined;

  if (state) {
    const message = state.message;
    if (message === "Form Validation Error") {
      emailErr = state.errors?.email ? state.errors.email[0] : undefined;
      passwordErr = state.errors?.password
        ? state.errors.password[0]
        : undefined;
    } else if (message === "Failed to Create Account") {
      isNewAccountCreated = false;
    } else if (message === "Done") {
      isNewAccountCreated = true;
    } else {
      unspecificError = message;
    }

    return {
      emailErr,
      passwordErr,
      isFormContainErrors,
      isNewAccountCreated,
      unspecificError,
    };
  } else {
    return {
      emailErr,
      passwordErr,
      isFormContainErrors,
      isNewAccountCreated,
      unspecificError,
    };
  }
}

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, formAction, isPending] = useActionState(signup, undefined);

  const { emailErr, unspecificError, passwordErr, isNewAccountCreated } =
    formStateParser(state);

  const emailHandler = function (value: string) {
    setEmail(value);
  };

  const passwordHandler = function (value: string) {
    setPassword(value);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#211F30] w-5/6 sm:w-1/3  text-white rounded-2xl  p-[2px] flex justify-center items-center">
        <div className="bg-brand/brand-dark rounded-2xl w-full h-full">
          <div className="flex flex-col justify-start py-5 px-5">
            <Image src={cypressLogo} alt="site_logo" width={100} />
            <span className="text-base font-semibold text-washed-purple/washed-purple-300">
              Welcome
            </span>
            {isNewAccountCreated ? (
              <span className="text-neutral/neutral-9 text-xs py-2 flex flex-row gap-x-3">
                Log in to your account to continue.
                <Link
                  href="./signin"
                  className="text-primary-blue/primary-blue-600"
                >
                  Sign In
                </Link>
              </span>
            ) : (
              <span className="text-neutral/neutral-9 text-xs py-2">
                An all in one Collaboration and Productivity Platform.
              </span>
            )}
          </div>

          {!isNewAccountCreated && (
            <div>
              <form action={formAction} className="flex flex-col p-5 gap-y-4">
                <CustomInput
                  id="email"
                  labelName="Email"
                  name="email"
                  placeHolderText="alice@express.com"
                  type="email"
                  onChange={emailHandler}
                  value={email}
                  fieldError={emailErr}
                  isPending={isPending}
                />

                <CustomInput
                  id="password"
                  labelName="Password"
                  name="password"
                  placeHolderText="password"
                  type="password"
                  onChange={passwordHandler}
                  value={password}
                  fieldError={passwordErr}
                  isPending={isPending}
                />

                <div className="relative pt-8">
                  <div
                    className={`text-white cursor-pointer relative  mx-auto justify-center items-center flex   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${"rounded-lg"}`}
                  >
                    <div
                      className={`${"rounded-lg"} flex ${
                        isPending
                          ? "text-gray-600"
                          : "text-washed-purple/washed-purple-300"
                      }  text-xs sm:text-xs mx-auto my-auto w-full px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
                    >
                      <button
                        className="w-full h-full"
                        type="submit"
                        disabled={isPending}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {unspecificError && (
                <div className="flex flex-row justify-center text-red-500">
                  {unspecificError}
                </div>
              )}

              <div className="px-5 flex justify-end text-neutral/neutral-9 pb-7">
                Already have an account?
                <span className="text-washed-purple/washed-purple-300 px-1 cursor-pointer">
                  <Link href="./signin">Sign In</Link>
                </span>
              </div>
            </div>
          )}
          {isNewAccountCreated && (
            <div className="bg-primary-purple/primary-purple-700 p-3 m-2 flex-col  rounded-lg flex justify-center items-center">
              <div className="flex flex-row items-center gap-x-4">
                <TfiEmail />
                Check Your Email
              </div>
              <span>An email confirmation has been Sent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
