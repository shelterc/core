export interface IResponse<T> {
  msg: string;
  code: number;
  data: T;
}
