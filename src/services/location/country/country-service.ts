import { ApiResponse, ICountryReq, ICountryRes } from "../../../interfaces";
import axiosClient from "../../api-client";

const countryService = {
  async getAllCountries(): Promise<ApiResponse<ICountryRes[]>> {
    return await axiosClient.get("/admin/countries/");
  },
  async getCountryById(id: number): Promise<ApiResponse<ICountryRes>> {
    return await axiosClient.get(`/admin/countries/${id}`);
  },
  async createCountry(data: ICountryReq): Promise<ApiResponse<ICountryRes>> {
    return await axiosClient.post("/admin/countries/", data);
  },
  async updateCountry(
    id: number,
    data: ICountryReq,
  ): Promise<ApiResponse<ICountryRes>> {
    return await axiosClient.put(`/admin/countries/${id}`, data);
  },
  async deleteCountry(id: number): Promise<ApiResponse<ICountryRes>> {
    return await axiosClient.delete(`/admin/countries/${id}`);
  },
};

export default countryService;
