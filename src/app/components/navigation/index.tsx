import Image from "next/image";
import logo from "../../../../public/footer_logo.png";
import logoMobile from "../../../../public/logo.png";
import ButtonMain from "../button";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

function Navigation() {
  return (
    <div className="fixed z-50 top-0 bg-brand/brand-dark flex flex-row w-full px-2 sm:px-5 h-[70px] border-b border-b-solid border-opacity-50 border-washed-purple/washed-purple-800">
      <div className="flex flex-row justify-evenly items-center text-white h-full w-full">
        <div className="flex flex-shrink-0">
          <div className="block sm:hidden">
            <Image src={logoMobile} alt="cypress_logo_mobile" width={35} />
          </div>
          <div className="hidden sm:block">
            <Image src={logo} alt="cypress_logo" width={100} />
          </div>
        </div>
        <div className="hidden sm:inline-block w-full  px-10">
          <ul className="text-xs flex flex-row justify-between max-w-[800px] mx-auto border-2 border-washed-purple/washed-purple-700 border-opacity-30  border-solid py-2 px-4 rounded-3xl">
            <li>
              <Link href={"#express"}>Express</Link>
            </li>
            <li>
              <Link href={"#pricing"}>Pricing</Link>
            </li>
            <li>
              <Link href={"#features"}>Features</Link>
            </li>
            <li>
              <Link href={"#testimonials"}>Testimonials</Link>
            </li>
            <li>Download</li>
          </ul>
        </div>
        <div className="flex flex-row gap-x-4 items-center flex-shrink-0 px-2">
          <div>
            <span className="text-washed-purple/washed-purple-400 text-xs">
              <Link href={"/signin"}>Login</Link>
            </span>
          </div>
          <div>
            <ButtonMain type="v2" text="Sign Up" />
          </div>
          <div className="block sm:hidden">
            <GiHamburgerMenu
              className="text-brand/brand-washed-purple"
              size={35}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
