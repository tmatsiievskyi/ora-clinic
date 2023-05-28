export interface ITableProps {
  items: data;
  headerItems: string[];
}

type data = {
  _id: string;
  data: any[];
}[];
