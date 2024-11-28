export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?:
    | {
        [key: string]: string[];
      }
    | string;
  message?: string;
  status_code: number;
}
