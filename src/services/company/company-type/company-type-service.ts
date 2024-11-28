import {
  ApiResponse,
  ICompanyTypeReq,
  ICompanyTypeRes,
} from "../../../interfaces";
import axiosClient from "../../api-client";

const companyTypeService = {
  async getAllCompanyType(): Promise<ApiResponse<ICompanyTypeRes[]>> {
    return await axiosClient.get("/admin/company-types");
  },
  async getCompanyTypeById(id: number): Promise<ApiResponse<ICompanyTypeRes>> {
    return await axiosClient.get(`/admin/company-types/${id}`);
  },
  async createCompanyType(
    data: ICompanyTypeReq,
  ): Promise<ApiResponse<ICompanyTypeRes>> {
    return await axiosClient.post("/admin/company-types", data);
  },
  async updateCompanyTypeById(
    id: number,
    data: ICompanyTypeReq,
  ): Promise<ApiResponse<ICompanyTypeRes>> {
    return await axiosClient.put(`/admin/company-types/${id}`, data);
  },
  async deleteCompanyType(id: number): Promise<ApiResponse<ICompanyTypeRes>> {
    return await axiosClient.delete(`/admin/company-types/${id}`);
  },
};

export default companyTypeService;
