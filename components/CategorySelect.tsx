import useWindowWidth, { LG } from "../hooks/useWindowWidth";
import { FC } from "react";
import { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";

interface CategorySelectProps {
  categories: Array<String>;
  selected: number;
  onChange: (idx: number) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({
  categories,
  selected,
  onChange,
}) => {
  const width = useWindowWidth();
  const [isActive, setIsActive] = useState(false);
  const newCategories = ["All", ...categories];

  return (
    <div className="py-4 border-gray-300 lg:pr-16 lg:border-r-2">
      <div
        className="flex gap-2 items-center mb-6 cursor-pointer lg:cursor-default"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="text-3xl font-bold text-gray-400 font-euclid">
          CATEGORIES
        </span>
        {width < LG ? (
          <>
            <BsCaretRightFill
              className={`text-gray-400 transition-transform ${
                isActive ? `rotate-90` : ``}`}
            />
            <span className="text-lg font-poppins">
              {newCategories[selected]}
            </span>
          </>
        ) : null}
      </div>
      <div
        className={`flex flex-col gap-2 font-barlow transition-[max-height] ease-in-out overflow-hidden pl-2 ${
          width >= LG || isActive ? `max-h-[250px]` : `max-h-0`
        }`}
      >
        {newCategories.map((cat, idx) => (
          <span
            key={idx}
            className={`cursor-pointer hover:text-black transition-colors ${
              idx === selected ? `text-black` : `text-gray-400`
            }`}
            onClick={() => {
              onChange(idx);
              setIsActive(false);
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
