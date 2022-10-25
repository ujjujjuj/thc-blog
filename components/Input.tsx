import { FC, useId } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
}

const Input: FC<InputProps> = ({ name, type, placeholder, defaultValue }) => {
  const inputId = useId();

  return (
    <>
      <label
        htmlFor={inputId}
        className="block mb-2 font-bold text-gray-300 text-md"
      >
        {name}
      </label>
      <input
        type={type}
        name={name.replaceAll(" ", "").toLowerCase()}
        placeholder={placeholder}
        id={inputId}
        defaultValue={defaultValue}
        className={`p-2 w-full text-gray-600 rounded border ring-blue-500 ring-offset-0 shadow appearance-none focus:outline-none focus:ring`}
      />
    </>
  );
};

export default Input;
