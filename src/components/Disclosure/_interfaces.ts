export interface IDisclosureProps {
  buttonText: string;
  items: any;
  group: string;
  defaultOpen?: boolean;
  buttonClassNames?: string;
  listClassNames?: string;
  showPrice?: boolean;
  buttonEl?: JSX.Element;
  listItemClassNames?: string;
}
