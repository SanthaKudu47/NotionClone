import "./styles.css";
function CustomInput({
  type = "text",
  placeHolderText = "Enter Value",
  id,
  name,
  labelName,
}: {
  type?: "email" | "password" | "text";
  placeHolderText?: string;
  id: string;
  name: string;
  labelName: string;
}) {
  return (
    <div className="flex flex-col  text-washed-purple/washed-purple-300 font-semibold ">
      <label htmlFor={id} className="pb-3">
        {labelName}
      </label>
      <input
        placeholder={placeHolderText}
        type={type}
        name={name}
        id={id}
        className="placeholder:text-xs placeholder:text-washed-purple/washed-purple-900 placeholder:opacity-85 customized_input px-2 py-1 bg-brand/brand-dark border border-solid border-washed-purple/washed-purple-500 rounded-lg text-[20px] font-normal text-washed-purple/washed-purple-500"
      />
    </div>
  );
}

export default CustomInput;
