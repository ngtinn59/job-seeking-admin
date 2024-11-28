import { ApiResponse, ICityReq, ICityRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const cityService = {
  async getAllCities(): Promise<ApiResponse<ICityRes[]>> {
    return await axiosClient.get("/admin/cities/");
  },
  async getCityById(id: number): Promise<ApiResponse<ICityRes>> {
    return await axiosClient.get(`/admin/cities/${id}`);
  },
  async createCity(data: ICityReq): Promise<ApiResponse<ICityRes>> {
    return await axiosClient.post("/admin/cities/", data);
  },
  async updateCity(id: number, data: ICityReq): Promise<ApiResponse<ICityRes>> {
    return await axiosClient.put(`/admin/cities/${id}`, data);
  },
  async deleteCity(id: number): Promise<ApiResponse<ICityRes>> {
    return await axiosClient.delete(`/admin/cities/${id}`);
  },
};

export default cityService;
