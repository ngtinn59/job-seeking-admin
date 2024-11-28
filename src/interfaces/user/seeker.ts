export interface ISeekerReq {
  name: string;
  email: string;
  password: string;
}

export interface ISeekerRes {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  account_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}
