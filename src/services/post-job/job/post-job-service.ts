import { ApiResponse, IJobPostingRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const postJobService = {
  async getAllPostJob(): Promise<ApiResponse<IJobPostingRes[]>> {
    return await axiosClient.get("/admin/jobs");
  },
  async getPostJobById(id: number): Promise<ApiResponse<IJobPostingRes>> {
    return await axiosClient.get(`/admin/jobs/${id}`);
  },
  async deletePostJob(id: number): Promise<ApiResponse<IJobPostingRes>> {
    return await axiosClient.delete(`/admin/jobs/${id}`);
  },
  async confirmPostJob(id: number): Promise<ApiResponse<IJobPostingRes>> {
    return await axiosClient.post(`/admin/jobs/${id}/confirm`);
  },
  async blockPostJob(id: number): Promise<ApiResponse<IJobPostingRes>> {
    return await axiosClient.post(`/admin/jobs/${id}/un-confirm`);
  },
};

export default postJobService;
