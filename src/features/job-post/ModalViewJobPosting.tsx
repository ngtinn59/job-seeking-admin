import { Modal } from "antd";
import { ApiResponse, IJobPostingRes } from "../../interfaces";
import { useState } from "react";
import { postJobService } from "../../services";
import { formatCurrency } from "../../utils";

interface ModalViewJobPostingProps {
  dataDetail: IJobPostingRes | null;
  setDataDetail: (value: IJobPostingRes | null) => void;
  openModalViewJobPosting: boolean;
  setOpenModalViewJobPosting: (value: boolean) => void;
}

const ModalViewJobPosting: React.FC<ModalViewJobPostingProps> = ({
  dataDetail,
  setDataDetail,
  openModalViewJobPosting,
  setOpenModalViewJobPosting,
}) => {
  const [dataJobPostingDetail, setDataJobPostingDetail] =
    useState<IJobPostingRes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobPostingDetail = async () => {
    setLoading(true);
    try {
      if (dataDetail?.id) {
        const res: ApiResponse<IJobPostingRes> =
          await postJobService.getPostJobById(dataDetail?.id);
        if (res && res.success) {
          setDataJobPostingDetail(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      setDataJobPostingDetail(null);
    }
    setLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    setLoading(true);
    if (open) {
      fetchJobPostingDetail();
    }
  };

  return (
    <Modal
      title={`Thông tin chi tiết công việc: ${dataJobPostingDetail?.title ? dataJobPostingDetail?.title : ""}`}
      width={1200}
      loading={loading}
      style={{ top: 20 }}
      okText="Đóng"
      cancelButtonProps={{ style: { display: "none" } }}
      maskClosable={false}
      afterClose={() => {
        setDataDetail(null);
        setDataJobPostingDetail(null);
      }}
      afterOpenChange={handleOpenChange}
      open={openModalViewJobPosting}
      onOk={() => {
        setOpenModalViewJobPosting(false);
      }}
      onCancel={() => {
        setOpenModalViewJobPosting(false);
      }}
    >
      {dataJobPostingDetail ? (
        <div className="p-6">
          {/* Job Title */}
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {dataJobPostingDetail.title}
          </h2>

          {/* Company Info */}
          <div className="mb-4 flex items-center">
            <img
              src={dataJobPostingDetail.company?.logo}
              alt="Company Logo"
              className="mr-4 h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {dataJobPostingDetail.company?.company_name}
              </h3>
              <p className="text-gray-600">{dataJobPostingDetail.workplace}</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">Vị trí:</p>
              <p className="text-gray-800">{dataJobPostingDetail.profession}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Cấp bậc:</p>
              <p className="text-gray-800">
                {dataJobPostingDetail.desired_level}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Hình thức làm việc:</p>
              <p className="text-gray-800">
                {dataJobPostingDetail.employment_type}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Số lượng:</p>
              <p className="text-gray-800">{dataJobPostingDetail.quantity}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Mức lương:</p>
              <p className="text-gray-800">
                {formatCurrency(dataJobPostingDetail.salary_from)} -{" "}
                {formatCurrency(dataJobPostingDetail.salary_to)}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Ngày kết thúc:</p>
              <p className="text-gray-800">
                {new Date(dataJobPostingDetail.last_date).toLocaleDateString(
                  "vi-VN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Trình độ học vấn:</p>
              <p className="text-gray-800">
                {dataJobPostingDetail.education_level}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Kinh nghiệm:</p>
              <p className="text-gray-800">
                {dataJobPostingDetail.skill_experience}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Mô tả công việc:</p>
            <p className="text-gray-800">{dataJobPostingDetail.description}</p>
          </div>

          {/* Job Benefits */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Phúc lợi:</p>
            <p className="text-gray-800">{dataJobPostingDetail.benefits}</p>
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Thông tin liên hệ:</p>
            <p className="text-gray-800">
              Người liên hệ: {dataJobPostingDetail.contact_name}
            </p>
            <p className="text-gray-800">
              Điện thoại: {dataJobPostingDetail.phone}
            </p>
            <p className="text-gray-800">Email: {dataJobPostingDetail.email}</p>
          </div>

          {/* Location Information */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">Địa chỉ làm việc:</p>
            <p className="text-gray-800">
              {dataJobPostingDetail.work_address},{" "}
              {dataJobPostingDetail.district}, {dataJobPostingDetail.city},{" "}
              {dataJobPostingDetail.country}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default ModalViewJobPosting;
