"use client";

import Image from "next/image";
import cypressLogo from "../../../../public/footer_logo.png";
import CustomInput from "@/app/components/input";
import Link from "next/link";
import { useActionState, useState } from "react";
import { signin } from "@/app/utils/actions/auth";
import { FormState } from "@/lib/definitions";
import { is } from "drizzle-orm";

function formStateParser(state: FormState) {
  let emailErr: string | undefined = undefined;
  let passwordErr: string | undefined = undefined;
  let isFormContainErrors = false;
  let isLoggedIn = false;
  let unspecificError: string | undefined = undefined;

  if (state) {
    const message = state.message;
    if (message === "Form Validation Error") {
      emailErr = state.errors?.email ? state.errors.email[0] : undefined;
      passwordErr = state.errors?.password
        ? state.errors.password[0]
        : undefined;
      isFormContainErrors = true;
    } else if (message === "Invalid login credentials") {
      isLoggedIn = false;
    } else if (message === "Done") {
      isLoggedIn = true;
    } else {
      unspecificError = message;
    }

    return {
      emailErr,
      passwordErr,
      isFormContainErrors,
      isLoggedIn,
      unspecificError,
    };
  } else {
    return {
      emailErr,
      passwordErr,
      isFormContainErrors,
      isLoggedIn,
      unspecificError,
    };
  }
}

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, formAction, isPending] = useActionState(signin, undefined);

  const {
    emailErr,
    isFormContainErrors,
    isLoggedIn,
    passwordErr,
    unspecificError,
  } = formStateParser(state);
  const emailHandler = function (value: string) {
    setEmail(value);
  };

  const passwordHandler = function (value: string) {
    setPassword(value);
  };
  console.log("ddd", isFormContainErrors === false);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#211F30] w-5/6 sm:w-1/3 text-white rounded-2xl  p-[2px] flex justify-center items-center">
        <div className="bg-brand/brand-dark rounded-2xl w-full h-full">
          <div className="flex flex-col justify-start py-5 px-5">
            <Image src={cypressLogo} alt="site_logo" width={100} />
            <span className="text-base font-semibold text-washed-purple/washed-purple-300">
              Welcome back
            </span>
            <span className="text-neutral/neutral-9 text-xs py-2">
              Log in to your account to continue.
            </span>
          </div>
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
                isPending={isPending}
                fieldError={emailErr}
              />

              <CustomInput
                id="password"
                labelName="Password"
                name="password"
                placeHolderText="password"
                type="password"
                value={password}
                onChange={passwordHandler}
                isPending={isPending}
                fieldError={passwordErr}
              />

              <div className="relative pt-8">
                <div
                  className={`text-white cursor-pointer relative  mx-auto justify-center items-center flex   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${"rounded-lg"}`}
                >
                  <div
                    className={`${"rounded-lg"} flex text-washed-purple/washed-purple-300 text-xs sm:text-xs mx-auto my-auto w-full px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
                  >
                    <button className="w-full h-full" type="submit">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {isFormContainErrors === false &&
              !isPending &&
              state != undefined &&
              (!isLoggedIn ? (
                <div className="flex flex-row justify-start px-6 text-red-700">
                  Invalid login credentials
                </div>
              ) : (
                ""
              ))}

            <div className="px-5 flex justify-end text-neutral/neutral-9 pt-2 relative pb-4">
              Don't have an account ?
              <span className="text-washed-purple/washed-purple-300 px-1 cursor-pointer">
                <Link href="/signup"> Sign up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
