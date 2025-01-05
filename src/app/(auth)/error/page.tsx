"use client";

import ButtonMain from "@/app/components/button";
import { BiError } from "react-icons/bi";
import Container from "@/app/components/container/container";
import { useSearchParams } from "next/navigation";

function ErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("err_message");
  return (
    <Container>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-washed-purple/washed-purple-200 text-sm font-light flex flex-col justify-center items-center">
        <span><BiError size={50} className="text-yellow-600"/></span>
          {errorMessage}
          <span className="py-4">
            <ButtonMain text="Home" type="v2" />
          </span>
        </div>
      </div>
    </Container>
  );
}

export default ErrorPage;
