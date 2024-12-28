import { Spinner } from "./Spinner.container";

export enum ESpinnerType {
  FULL_SCREEN = "full",
  BASE = "base",
}

export const WithSpinner = ({ type }: { type: ESpinnerType }) => {
  if (type === ESpinnerType.FULL_SCREEN) {
    return (
      <div className=" fixed w-full h-full bg-lightShade  z-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  );
};
