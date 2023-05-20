import { IArrowProps } from "./_interfaces";

export const ArrowRight = ({
  onClick,
  classNameArrow,
  classNameWrapper,
}: IArrowProps) => {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={classNameWrapper}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={classNameArrow}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export const ArrowLeft = ({
  onClick,
  classNameArrow,
  classNameWrapper,
}: IArrowProps) => {
  return (
    <div
      onClick={onClick ? () => onClick() : undefined}
      className={classNameWrapper}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={classNameArrow}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};
