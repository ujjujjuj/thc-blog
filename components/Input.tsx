import { FC, useId } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
}

const Input: FC<InputProps> = ({ name, type, placeholder }) => {
  const inputId = useId();

  return (
    <>
      <label
        htmlFor={inputId}
        className="block font-bold text-md text-gray-600 mb-2"
      >
        {name}
      </label>
      <input
        type={type}
        name={name.toLowerCase()}
        placeholder={placeholder}
        id={inputId}
        className="appearance-none w-full p-2 border rounded shadow focus:outline-none focus:ring ring-blue-500 ring-offset-0 text-gray-600"
      />
    </>
  );
};

export default Input;
