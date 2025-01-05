function ButtonMain({
  text = "Get Cypress Free",
  type = "v1",
}: {
  text?: string;
  type: "v1" | "v2";
}) {
  return (
    <div
      className={`text-white cursor-pointer relative inline-block mx-auto justify-center items-center   bg-gradient-to-r from-neutral/neutral-9 to-washed-purple/washed-purple-700 p-[1.5px] ${
        type === "v1" ? "rounded-2xl" : "rounded-lg"
      }`}
    >
      <div
        className={`${
          type == "v1" ? "rounded-2xl" : "rounded-lg"
        } text-washed-purple/washed-purple-300 text-xs sm:text-xs mx-auto my-auto flex px-3 py-1  bg-gradient-to-t from-neutral/neutral-10 to-neutral/neutral-13`}
      >
        {text}
      </div>
    </div>
  );
}

export default ButtonMain;
