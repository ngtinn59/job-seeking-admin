import { ApiResponse, ICompanyRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const companiesService = {
  async getAllCompanies(): Promise<ApiResponse<ICompanyRes[]>> {
    return await axiosClient.get("/admin/companies");
  },
  async getCompanyById(id: number): Promise<ApiResponse<ICompanyRes>> {
    return await axiosClient.get(`/admin/companies/${id}`);
  },
  async deleteCompany(id: number): Promise<ApiResponse<ICompanyRes>> {
    return await axiosClient.delete(`/admin/companies/${id}`);
  },
  async rateCompany(id: number): Promise<ApiResponse<ICompanyRes>> {
    return await axiosClient.post(`/admin/companies/${id}/mark-as-hot`);
  },
  async unrateCompany(id: number): Promise<ApiResponse<ICompanyRes>> {
    return await axiosClient.post(`admin/companies/${id}/mark-as-not-hot`);
  },
};

export default companiesService;
