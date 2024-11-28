import { ApiResponse, ILanguageReq, ILanguageRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const languageService = {
  async getAllLanguage(): Promise<ApiResponse<ILanguageRes[]>> {
    return await axiosClient.get("/admin/languages");
  },
  async getLanguageById(id: number): Promise<ApiResponse<ILanguageRes>> {
    return await axiosClient.get(`/admin/languages/${id}`);
  },
  async createLanguage(data: ILanguageReq): Promise<ApiResponse<ILanguageRes>> {
    return await axiosClient.post("/admin/languages", data);
  },
  async updateLanguageById(
    id: number,
    data: ILanguageReq,
  ): Promise<ApiResponse<ILanguageRes>> {
    return await axiosClient.put(`/admin/languages/${id}`, data);
  },
  async deleteLanguage(id: number): Promise<ApiResponse<ILanguageRes>> {
    return await axiosClient.delete(`/admin/languages/${id}`);
  },
};

export default languageService;
