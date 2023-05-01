export interface IResp<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}
