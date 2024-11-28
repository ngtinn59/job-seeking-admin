import { reportService } from "../../services";

const ManageReport: React.FC = () => {
  interface FetchReportFunc {
    (): Promise<BlobPart>;
  }

  const downloadPDF = async (
    fetchReportFunc: FetchReportFunc,
    fileName: string,
  ): Promise<void> => {
    try {
      const res = await fetchReportFunc();
      const blob = new Blob([res], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading ${fileName}:`, error);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-8">
      <h1 className="mb-6 text-center text-2xl font-semibold uppercase text-blue-500">
        Tải báo cáo về máy
      </h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm transition hover:bg-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Báo cáo Lương
            </h2>
            <p className="text-sm text-gray-500">
              Tải xuống báo cáo lương mới nhất.
            </p>
          </div>
          <button
            onClick={() =>
              downloadPDF(reportService.getReportJob, "salary_report.pdf")
            }
            className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition hover:bg-blue-600"
          >
            Tải xuống
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm transition hover:bg-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Báo cáo Công ty
            </h2>
            <p className="text-sm text-gray-500">
              Tải xuống báo cáo tổng quan về công ty.
            </p>
          </div>
          <button
            onClick={() =>
              downloadPDF(reportService.getReportCompany, "company_report.pdf")
            }
            className="rounded-lg bg-green-500 px-4 py-2 text-white shadow transition hover:bg-green-600"
          >
            Tải xuống
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm transition hover:bg-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Báo cáo Mục tiêu
            </h2>
            <p className="text-sm text-gray-500">
              Tải xuống báo cáo mục tiêu người dùng.
            </p>
          </div>
          <button
            onClick={() =>
              downloadPDF(
                reportService.getReporObjective,
                "objective_report.pdf",
              )
            }
            className="rounded-lg bg-purple-500 px-4 py-2 text-white shadow transition hover:bg-purple-600"
          >
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageReport;
