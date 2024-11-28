import { ApiResponse, IWorkTypeReq, IWorkTypeRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const workTypeService = {
  async getAllWorkType(): Promise<ApiResponse<IWorkTypeRes[]>> {
    return await axiosClient.get("/admin/employment-types/");
  },
  async getWorkTypeById(id: number): Promise<ApiResponse<IWorkTypeRes>> {
    return await axiosClient.get(`/admin/employment-types/${id}`);
  },
  async createWorkType(data: IWorkTypeReq): Promise<ApiResponse<IWorkTypeRes>> {
    return await axiosClient.post("/admin/employment-types/", data);
  },
  async updateWorkTypeById(
    id: number,
    data: IWorkTypeReq,
  ): Promise<ApiResponse<IWorkTypeRes>> {
    return await axiosClient.put(`/admin/employment-types/${id}`, data);
  },
  async deleteWorkType(id: number): Promise<ApiResponse<IWorkTypeRes>> {
    return await axiosClient.delete(`/admin/employment-types/${id}`);
  },
};

export default workTypeService;
