import axiosClient from "../api-client";

const reportService = {
  async getReportJob(): Promise<any> {
    return await axiosClient.get("/admin/statistics/salary-report", {
      responseType: "blob",
    });
  },
  async getReportCompany(): Promise<any> {
    return await axiosClient.get("/admin/statistics/companies-report", {
      responseType: "blob",
    });
  },
  async getReporObjective(): Promise<any> {
    return await axiosClient.get("/admin/statistics/objective-report", {
      responseType: "blob",
    });
  },
};

export default reportService;
