export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthRes {
  id?: number;
  success?: boolean;
  message?: string;
  name?: string;
  access_token?: string;
  email_verified?: boolean;
  token_type?: string;
  status_code?: number;
  error?: {
    [key: string]: string[];
  };
}
