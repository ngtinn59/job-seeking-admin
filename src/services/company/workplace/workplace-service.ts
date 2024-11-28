import { ApiResponse, IWorkplaceReq, IWorkplaceRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const workplaceService = {
  async getAllWorkplace(): Promise<ApiResponse<IWorkplaceRes[]>> {
    return await axiosClient.get("/admin/workplaces");
  },
  async getWorkplaceById(id: number): Promise<ApiResponse<IWorkplaceRes>> {
    return await axiosClient.get(`/admin/workplaces/${id}`);
  },
  async createWorkplace(
    data: IWorkplaceReq,
  ): Promise<ApiResponse<IWorkplaceRes>> {
    return await axiosClient.post("/admin/workplaces", data);
  },
  async updateWorkplaceById(
    id: number,
    data: IWorkplaceReq,
  ): Promise<ApiResponse<IWorkplaceRes>> {
    return await axiosClient.put(`/admin/workplaces/${id}`, data);
  },
  async deleteWorkplace(id: number): Promise<ApiResponse<IWorkplaceRes>> {
    return await axiosClient.delete(`/admin/workplaces/${id}`);
  },
};

export default workplaceService;
