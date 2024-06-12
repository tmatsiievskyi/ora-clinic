export interface ITableProps {
  items: data;
  headerItems: string[];
}

type data = {
  _id: string;
  localizedName: string;
  data: any[];
}[];
