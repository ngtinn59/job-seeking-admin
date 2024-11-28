export interface ICityReq {
  name: string;
  country_id: number;
}

export interface ICityRes {
  id: number;
  name: string;
  country: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
