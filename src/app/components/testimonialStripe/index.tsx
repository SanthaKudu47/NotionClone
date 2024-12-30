import TestimonialCard from "../testiminailCard";
import { testimonials } from "../testiminailCard/data";

import "./styles.css";

function TestimonialStrip() {
  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="py-[50px] flex flex-row w-full h-[250px] sm:h-[185px] overflow-hidden relative items-center">
        <div className="absolute w-[3000px] sm:w-[3800px] flex flex-row  left-0 justify-around strip-animate">
          {testimonials.map((testimonial, index) => {
            const { description, gmail, imgScr, userName } = testimonial;
            return (
              <TestimonialCard
                key={index}
                keyValue={index}
                gmail={gmail}
                imgScr={imgScr}
                userName={userName}
                description={description}
              />
            );
          })}
        </div>
      </div>

      <div className="py-[50px] flex flex-row w-full h-[250px] sm:h-[185px] overflow-hidden relative items-center">
        <div className="absolute w-[3000px] sm:w-[3800px] flex flex-row  right-[0px] justify-around strip-animate-reverse ">
          {testimonials.map((testimonial, index) => {
            const { description, gmail, imgScr, userName } = testimonial;
            return (
              <TestimonialCard
                key={index}
                keyValue={index}
                gmail={gmail}
                imgScr={imgScr}
                userName={userName}
                description={description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TestimonialStrip;
