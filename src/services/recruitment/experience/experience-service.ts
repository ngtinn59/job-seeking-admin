import {
  ApiResponse,
  IExperienceReq,
  IExperienceRes,
} from "../../../interfaces";
import axiosClient from "../../api-client";

const experienceService = {
  async getAllExperience(): Promise<ApiResponse<IExperienceRes[]>> {
    return await axiosClient.get("/admin/experience-levels");
  },
  async getExperienceById(id: number): Promise<ApiResponse<IExperienceRes>> {
    return await axiosClient.get(`/admin/experience-levels/${id}`);
  },
  async createExperience(
    data: IExperienceReq,
  ): Promise<ApiResponse<IExperienceRes>> {
    return await axiosClient.post("/admin/experience-levels", data);
  },
  async updateExperienceById(
    id: number,
    data: IExperienceReq,
  ): Promise<ApiResponse<IExperienceRes>> {
    return await axiosClient.put(`/admin/experience-levels/${id}`, data);
  },
  async deleteExperience(id: number): Promise<ApiResponse<IExperienceRes>> {
    return await axiosClient.delete(`/admin/experience-levels/${id}`);
  },
};

export default experienceService;
