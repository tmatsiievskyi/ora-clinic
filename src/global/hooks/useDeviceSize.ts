import { useEffect, useState } from "react";

export const useDeviceSize = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleWindowResize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();
    // window.addEventListener("resize", handleWindowResize);

    // return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // useEffect(() => {
  //   let vh = height * 0.01;

  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, [height]);

  return [width, height];
};
