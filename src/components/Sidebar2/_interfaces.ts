export interface ISidebarProps {
  title: string;
  children: JSX.Element;
  classNameBox?: string;
  classNameLink?: string;
  activeItem?: string | string[];
  handleOpen: () => void;
  isOpen: boolean;
}
