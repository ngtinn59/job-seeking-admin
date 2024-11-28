import { ApiResponse, IDistrictReq, IDistrictRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const districtService = {
  async getAllDistricts(): Promise<ApiResponse<IDistrictRes[]>> {
    return await axiosClient.get("/admin/districts/");
  },
  async getDistrictById(id: number): Promise<ApiResponse<IDistrictRes>> {
    return await axiosClient.get(`/admin/districts/${id}`);
  },
  async createDistrict(data: IDistrictReq): Promise<ApiResponse<IDistrictRes>> {
    return await axiosClient.post("/admin/districts/", data);
  },
  async updateDistrict(
    id: number,
    data: IDistrictReq,
  ): Promise<ApiResponse<IDistrictRes>> {
    return await axiosClient.put(`/admin/districts/${id}`, data);
  },
  async deleteDistrict(id: number): Promise<ApiResponse<IDistrictRes>> {
    return await axiosClient.delete(`/admin/districts/${id}`);
  },
};

export default districtService;
