import Image from "next/image";
import cypressLogo from "../../../../public/footer_logo.png";
import CustomInput from "@/app/components/input";

function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-[#211F30] w-5/6 sm:w-1/3 h-[530px] sm:h-[550px] text-white rounded-2xl  p-[2px] flex justify-center items-center">
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
            <form action="#" className="flex flex-col p-5 gap-y-4">
              <CustomInput
                id="email"
                labelName="Email"
                name="email"
                placeHolderText="alice@express.com"
                type="email"
              />

              <CustomInput
                id="password"
                labelName="Password"
                name="password"
                placeHolderText="password"
                type="password"
              />

              <div className="relative pt-8">
                <div
                  className={`text-white cursor-pointer relative  mx-auto justify-center items-center flex   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${"rounded-lg"}`}
                >
                  <div
                    className={`${"rounded-lg"} flex text-washed-purple/washed-purple-300 text-xs sm:text-xs mx-auto my-auto w-full px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
                  >
                    <button className="w-full h-full" type="submit">
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="px-5 flex justify-end text-neutral/neutral-9">
              Don't have an account ?
              <span className="text-washed-purple/washed-purple-300 px-1 cursor-pointer">
                 Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
