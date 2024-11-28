export interface IDistrictReq {
  name: string;
  city_id: number;
}

export interface IDistrictRes {
  id: number;
  name: string;
  city: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
