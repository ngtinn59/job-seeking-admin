import { ApiResponse, IEducationReq, IEducationRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const educationService = {
  async getAllEducation(): Promise<ApiResponse<IEducationRes[]>> {
    return await axiosClient.get("/admin/education-levels");
  },
  async getEducationById(id: number): Promise<ApiResponse<IEducationRes>> {
    return await axiosClient.get(`/admin/education-levels/${id}`);
  },
  async createEducation(
    data: IEducationReq,
  ): Promise<ApiResponse<IEducationRes>> {
    return await axiosClient.post("/admin/education-levels", data);
  },
  async updateEducationById(
    id: number,
    data: IEducationReq,
  ): Promise<ApiResponse<IEducationRes>> {
    return await axiosClient.put(`/admin/education-levels/${id}`, data);
  },
  async deleteEducation(id: number): Promise<ApiResponse<IEducationRes>> {
    return await axiosClient.delete(`/admin/education-levels/${id}`);
  },
};

export default educationService;
