export interface ICountryReq {
  name: string;
}

export interface ICountryRes {
  id: number;
  name: string;
  users_id: number;
  created_at: string;
  updated_at: string;
}
