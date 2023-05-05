export interface ICompWithFramerProps {
  children: JSX.Element;
  className?: string;
  from: "left" | "right" | "width";
  delay: number;
  duration: number;
}
