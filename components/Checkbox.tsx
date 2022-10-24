import { FC, SyntheticEvent, useId } from "react";

interface CheckboxProps {
  name: string;
  value: Boolean;
  onChange: (e: SyntheticEvent) => void;
}
const Checkbox: FC<CheckboxProps> = ({ name, value, onChange }) => {
  const checkboxId = useId();

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value={value ? "checked" : "unchecked"}
        onChange={onChange}
        id={checkboxId}
        className="sr-only peer"
        name={name.toLowerCase()}
      />
      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium">{name}</span>
    </label>
  );
};
export default Checkbox;
