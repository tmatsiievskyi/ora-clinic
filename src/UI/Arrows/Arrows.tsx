import { IArrowProps } from "./_interfaces";

export const ArrowRight = ({
  onClick,
  classNameArrow,
  classNameWrapper,
}: IArrowProps) => {
  return (
    <div
      //   onClick={() => {
      //     updateIndex(employeeIndex + 1);
      //   }}
      onClick={() => onClick()}
      className={classNameWrapper}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        // className={`w-14 h-14 text-lightShade`}
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
      //   onClick={() => {
      //     updateIndex(employeeIndex + 1);
      //   }}
      onClick={() => onClick()}
      className={classNameWrapper}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        // className={`w-14 h-14 text-lightShade`}
        className={classNameArrow}
        onClick={() => onClick()}
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
