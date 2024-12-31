import Image from "next/image";
import priceCardIcon from "../../../../public/priceCardIcon.png";
import featureIcon from "../../../../public/featureIcon.png";
import ButtonMain from "../button";

const priceCardData = [
  ["Collaborative workplace.", "Basic page analytics.", "Invite 10 guests."],
];

function PriceCard({
  features = priceCardData[0],
  planeName = "Price Name",
  price = "0",
  line1 = "Limited Block trail for teams.",
  line2,
  light = false,
}: {
  features?: string[];
  planeName?: string;
  price?: string;
  line1?: string;
  line2?: string;
  light?: boolean;
}) {
  return (
    <div className="flex relative flex-col sm:flex-row justify-center items-center sm:items-stretch">
      <div className="relative border border-solid border-washed-purple/washed-purple-700 rounded-2xl px-6 py-[50px] flex flex-col w-[330px] bg-brand/brand-dark">
        <div className="flex flex-row">
          <div>
            <Image src={priceCardIcon} alt="icon" width={30} height={30} />
          </div>
          <div className="text-washed-blue/washed-blue-300 text-xl pt-4 font-semibold">
            {planeName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-washed-purple/washed-purple-800 text-lg">{`$${price}`}</div>
          <div className="text-neutral/neutral-8 text-xs">{line1}</div>
          {line2 && (
            <div className="text-neutral/neutral-8 text-xs">{line2}</div>
          )}
          <div className="py-5">
            <ButtonMain type="v2" text="Get Started" />
          </div>
          <div className="text-neutral/neutral-5 text-xs">
            Everything in Free+
          </div>
          <div>
            <ul className="flex flex-col gap-y-2 py-3">
              {features.map((feature, index) => {
                return (
                  <li
                    className="flex flex-row gap-x-2 items-center"
                    key={index}
                  >
                    <span>
                      <Image
                        src={featureIcon}
                        alt="feature_icon"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="text-neutral/neutral-6">{feature}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="z-0 absolute flex inset-0 justify-center items-center">
        {light && (
          <div className="bg-[#0469FF] opacity-30 rounded-full blur-3xl w-[450px] h-[450px] flex"></div>
        )}
      </div>
    </div>
  );
}

export default PriceCard;
