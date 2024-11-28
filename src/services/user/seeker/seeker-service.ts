import { ApiResponse, ISeekerReq, ISeekerRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const seekerService = {
  async getAllSeeker(): Promise<ApiResponse<ISeekerRes[]>> {
    return await axiosClient.get("/admin/users");
  },
  async getSeekerById(id: string) {
    return await axiosClient.get(`/api/admin/users/${id}`);
  },
  async createSeeker(data: ISeekerReq): Promise<ApiResponse<ISeekerRes>> {
    return await axiosClient.post("/admin/users", data);
  },
  async updateSeekerById(
    id: number,
    data: ISeekerReq,
  ): Promise<ApiResponse<ISeekerRes>> {
    return await axiosClient.put(`/admin/users/${id}`, data);
  },
  async deleteSeeker(id: number): Promise<ApiResponse<ISeekerRes>> {
    return await axiosClient.delete(`/admin/users/${id}`);
  },
  async blockSeeker(id: number): Promise<ApiResponse<ISeekerRes>> {
    return await axiosClient.post(`/admin/block-user/${id}`);
  },
  async unBlockSeeker(id: number): Promise<ApiResponse<ISeekerRes>> {
    return await axiosClient.post(`/admin/unblock-user/${id}`);
  },
};

export default seekerService;
