import { useRef, useEffect } from "react";

export const usePrev = <T>(value: T): T => {
  const prevValue = useRef<T>(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  return prevValue.current;
};
