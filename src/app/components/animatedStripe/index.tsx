"use client";
import Image from "next/image";
import { data } from "./data";
import { useEffect, useRef } from "react";

import "./styles.css";
function AnimatedStripe() {
  const movingContainer = useRef(null);
  useEffect(() => {
    if (!movingContainer?.current) return;

    const element: HTMLDivElement = movingContainer.current;
    const { left, right } = element.getBoundingClientRect();
    // element.style.left=`${left}px`;
    console.log(left, right);
  }, []);
  return (
    <div className="w-full flex flex-row gap-x-5 h-full relative py-[100px] overflow-hidden justify-start items-center">
      <div
        className="scroll-animate w-[1800px] sm:w-[2600px] absolute  h-[50px] flex flex-row  justify-around p-1"
        ref={movingContainer}
      >
        {data.map((imgSrc, index) => {
          return (
            <div className="flex object-cover" key={index}>
              <Image alt="cmp_logo" src={imgSrc} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnimatedStripe;
