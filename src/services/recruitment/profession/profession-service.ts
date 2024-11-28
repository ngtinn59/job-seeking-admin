import {
  ApiResponse,
  IProfessionReq,
  IProfessionRes,
} from "../../../interfaces";
import axiosClient from "../../api-client";

const professionService = {
  async getAllProfession(): Promise<ApiResponse<IProfessionRes[]>> {
    return await axiosClient.get("/admin/professions");
  },
  async getProfessionById(id: number): Promise<ApiResponse<IProfessionRes>> {
    return await axiosClient.get(`/admin/professions/${id}`);
  },
  async createProfession(
    data: IProfessionReq,
  ): Promise<ApiResponse<IProfessionRes>> {
    return await axiosClient.post("/admin/professions", data);
  },
  async updateProfessionById(
    id: number,
    data: IProfessionReq,
  ): Promise<ApiResponse<IProfessionRes>> {
    return await axiosClient.put(`/admin/professions/${id}`, data);
  },
  async deleteProfession(id: number): Promise<ApiResponse<IProfessionRes>> {
    return await axiosClient.delete(`/admin/professions/${id}`);
  },
};

export default professionService;
