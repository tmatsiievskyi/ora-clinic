import { cva } from "cva";

export const inputStyles = cva("", {
  variants: {
    compType: {
      anim: {},
      default: {},
    },
    inputType: {
      default: `w-full rounded-md border font-light border-input bg-transparent
       text-primary shadow-sm transition-colors 
      file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder-gray-300 placeholder:text-sm
      focus-visible:outline-none  without-ring 
      focus:border-primary/40  focus:shadow-md
      disabled:cursor-not-allowed disabled:opacity-50`,
      anim: "outline-none px-3 py-3 peer relative border-none shadow-none focus:shadow-sm text-primary/",
    },

    inputState: {
      normal: "",
      error: `transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-destructive 
        hover:border-destructive focus:border-destructive focus:ring-destructive`,
      errorAnim: "border-destructive group-focus-within:!border-destructive",
      valid: "border-success focus:border-success",
      validAnim:
        "border-success focus:border-success group-focus-within:!border-success",
      disabled:
        "pointer-events-none cursor-not-allowed bg-gray-100  shadow-inner text-gray-400 focus:border-input",
      disabledAnim: "pointer-events-none cursor-not-allowed bg-gray-100",
    },
    size: {
      default: ["text-base"],
      sm: ["text-small"],
      large: ["text-lg"],
      xxl: ["text-2xl"],
    },
    spacing: {
      default: ["py-3", "px-3"],
      small: ["py-1", "px-2"],
      large: ["py-2", "px-4"],
      xxl: ["py-3", "px-5"],
    },
    rounded: {
      default: "rounded-md",
      sm: "rounded-sm",
      lg: "rounded-lg",
      xl: "rounded-xl",
      xxl: "rounded-2xl",
      none: "rounded-none",
      full: "rounded-full",
    },
    wrapperType: {
      default: "relative w-full min-w-[200px]",
      anim: "relative max-w-[fit-content] group",
    },
    labelType: {
      default: `py-0 px-0 text-gray-600 text-sm`,
      anim: `absolute left-[9px] top-px text-sm text-gray-300 transition-all duration-300 px-1 transform -translate-y-1/2 
      pointer-events-none 
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm group-focus-within:!top-px group-focus-within:!text-sm
    group-focus-within:!text-primary/50`,
    },
    fieldSet: {
      default: `inset-0 absolute border border-input rounded pointer-events-none mt-[-10px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-primary/30 group-focus-within:border-1`,
      forValue: `inset-0 absolute border border-input rounded pointer-events-none mt-[-10px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-input group-focus-within:!border-primary/30`,
    },
  },
  compoundVariants: [
    {
      inputType: "default",
      wrapperType: "default",
      labelType: "default",
      size: "default",
      spacing: "default",
      rounded: "default",
      fieldSet: "default",
    },
  ],
  defaultVariants: {
    inputType: "default",
    wrapperType: "default",
    size: "default",
    rounded: "default",
    spacing: "default",
  },
});
