import {
  ApiResponse,
  IDesiredPositionReq,
  IDesiredPositionRes,
} from "../../../interfaces";
import axiosClient from "../../api-client";

const desiredPositionService = {
  async getAllDesiredPosition(): Promise<ApiResponse<IDesiredPositionRes[]>> {
    return await axiosClient.get("/admin/desired-levels");
  },
  async getDesiredPositionById(
    id: number,
  ): Promise<ApiResponse<IDesiredPositionRes>> {
    return await axiosClient.get(`/admin/desired-levels/${id}`);
  },
  async createDesiredPosition(
    data: IDesiredPositionReq,
  ): Promise<ApiResponse<IDesiredPositionRes>> {
    return await axiosClient.post("/admin/desired-levels", data);
  },
  async updateDesiredPositionById(
    id: number,
    data: IDesiredPositionReq,
  ): Promise<ApiResponse<IDesiredPositionRes>> {
    return await axiosClient.put(`/admin/desired-levels/${id}`, data);
  },
  async deleteDesiredPositionById(
    id: number,
  ): Promise<ApiResponse<IDesiredPositionRes>> {
    return await axiosClient.delete(`/admin/desired-levels/${id}`);
  },
};

export default desiredPositionService;
