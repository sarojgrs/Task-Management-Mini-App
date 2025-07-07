export interface ResponseData<T> {
  data?: T | null;
  message: string;
  success: boolean;
}
