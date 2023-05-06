export interface ICompWithFramerProps {
  children: JSX.Element;
  className?: string;
  from: "left" | "right" | "width" | "opacity" | "scale";
  delay: number;
  duration: number;
  key?: string;
}
