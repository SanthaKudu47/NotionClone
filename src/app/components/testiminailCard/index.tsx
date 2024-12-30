import Image from "next/image";
import avatarImageOne from "../../../../public/avatar_1.png";

function TestimonialCard({
  keyValue,
  imgScr = avatarImageOne.src,
  gmail,
  userName,
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
}: {
  imgScr: string;
  userName: string;
  gmail: string;
  description?: string;
  keyValue: number;
}) {
  return (
    <div key={`key_${keyValue}`} className="border border-solid border-washed-purple/washed-purple-900 inline-block rounded-2xl py-2 max-w-[320px] sm:max-w-[450px] px-4">
      <div className="flex flex-row gap-y-3 gap-x-4 items-center">
        <div className="rounded-full w-[50px] h-[50px] flex justify-center items-center bg-green-500">
          <Image src={imgScr} alt="avatar" width={50} height={50} />
        </div>
        <div className="text-white flex flex-col">
          <div className="text-washed-purple/washed-purple-600 text-xs">
            {userName}
          </div>
          <div className="text-washed-purple/washed-purple-800 text-xs">
            {gmail}
          </div>
        </div>
      </div>
      <div className="text-washed-purple/washed-purple-600 text-xs leading-8 text-justify py-1">
        {description}
      </div>
    </div>
  );
}

export default TestimonialCard;
