import {
  ApiResponse,
  ICompanySizeReq,
  ICompanySizeRes,
} from "../../../interfaces";
import axiosClient from "../../api-client";

const companySizeService = {
  async getAllCompanySize(): Promise<ApiResponse<ICompanySizeRes[]>> {
    return await axiosClient.get("/admin/company-sizes");
  },
  async getCompanySizeById(id: number): Promise<ApiResponse<ICompanySizeRes>> {
    return await axiosClient.get(`/admin/company-sizes/${id}`);
  },
  async createCompanySize(
    data: ICompanySizeReq,
  ): Promise<ApiResponse<ICompanySizeRes>> {
    return await axiosClient.post("/admin/company-sizes", data);
  },
  async updateCompanySizeById(
    id: number,
    data: ICompanySizeReq,
  ): Promise<ApiResponse<ICompanySizeRes>> {
    return await axiosClient.put(`/admin/company-sizes/${id}`, data);
  },
  async deleteCompanySize(id: number): Promise<ApiResponse<ICompanySizeRes>> {
    return await axiosClient.delete(`/admin/company-sizes/${id}`);
  },
};

export default companySizeService;
