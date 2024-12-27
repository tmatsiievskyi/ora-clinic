import { cnm } from "@/global/utils";

// import { WithIcon } from 'components/Icon';
import { useEffect, useRef, useState } from "react";
import { Button } from "tm-ui";
import { TSelectOption, TSelectProps } from "./_interfaces";
import { ArrowRight } from "@/UI/Arrows";

export const SelectComponent = ({
  label,
  size = "small",
  btnCN,
  value,
  options,
  onChange,
}: TSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && optionsRef.current && selectRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const optionsRect = optionsRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;

      setOpenTop(spaceBelow < optionsRect.height && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: TSelectOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative h-full" ref={selectRef}>
      <Button
        buttonType="base"
        className={cnm(
          "bg-bkg text-bkg-frg border-[1px] border-bkg-sec-frg/20 relative  px-2 md:px-4 h-full text-base text-dark",
          btnCN,
        )}
        label={value ? value.label : label}
        onClick={handleToggle}
        rightIcon={
          <ArrowRight
            classNameWrapper={cnm(
              `${isOpen && "rotate-180"} duration-300 h-[18px] w-[18px] ml-2`,
            )}
            classNameArrow={`w-[18px] h-[18px] text-dark/80 rotate-90`}
          />
        }
        size={size}
      />
      {isOpen && (
        <ul
          className={`absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
            openTop ? "bottom-full mb-1" : "top-full mt-1"
          }`}
          role="listbox"
          tabIndex={-1}
          ref={optionsRef}
        >
          {options.map((option) => (
            <li
              aria-selected={value?.value === option.value}
              className={`${
                value?.value === option.value
                  ? "text-white bg-primary hover:bg-primary"
                  : "text-bkg-sec-frg"
              } cursor-pointer select-none relative py-2 pl-2 pr-2 hover:bg-primary/40`}
              key={option.value}
              onClick={() => handleSelect(option)}
              role="option"
            >
              <span
                className={`block truncate ${
                  value?.value === option.value
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
