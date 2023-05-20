export interface ISidebarProps {
  classNameBox?: string;
  classNameLink?: string;
  items: { key: string; href: string; i18nKey: string }[];
  activeItem?: string | string[];
  handleOpen: () => void;
  isOpen: boolean;
}
