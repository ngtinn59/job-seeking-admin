import { IAuthRequest, IAuthRes } from "../../interfaces";
import axiosClient from "../api-client";

const authService = {
  async login(authRequest: IAuthRequest): Promise<IAuthRes> {
    return await axiosClient.post("/login", authRequest);
  },
};

export default authService;
