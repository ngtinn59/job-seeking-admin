import { Avatar, Modal } from "antd";
import { ApiResponse, ICompanyRes } from "../../../interfaces";
import { useState } from "react";
import { companiesService } from "../../../services";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";

interface ModalViewCompanyProps {
  dataDetail: ICompanyRes | null;
  setDataDetail: (value: ICompanyRes | null) => void;
  openModalViewCompany: boolean;
  setOpenModalViewCompany: (value: boolean) => void;
}

const ModalViewCompany: React.FC<ModalViewCompanyProps> = ({
  dataDetail,
  setDataDetail,
  openModalViewCompany,
  setOpenModalViewCompany,
}) => {
  const [dataCompanyDetail, setDataCompanyDetail] =
    useState<ICompanyRes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCompanyDetail = async () => {
    setLoading(true);
    try {
      if (dataDetail?.id) {
        const res: ApiResponse<ICompanyRes> =
          await companiesService.getCompanyById(dataDetail.id);
        if (res && res.success) {
          setDataCompanyDetail(res.data);
        }
        if (res && !res.success) {
          toast.error(res.message || "Công ty không tồn tại");
          setDataCompanyDetail(null);
        }
      }
    } catch (error) {
      console.log(error);
      setDataCompanyDetail(null);
    }
    setLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    setLoading(true);
    if (open) {
      fetchCompanyDetail();
    }
  };

  return (
    <Modal
      title={`Thông tin chi tiết công ty: ${dataCompanyDetail?.name ?? ""} `}
      width={1200}
      loading={loading}
      style={{ top: 20 }}
      okText="Đóng"
      cancelButtonProps={{ style: { display: "none" } }}
      maskClosable={false}
      afterClose={() => {
        setDataDetail(null);
        setDataCompanyDetail(null);
      }}
      afterOpenChange={handleOpenChange}
      open={openModalViewCompany}
      onOk={() => {
        setOpenModalViewCompany(false);
      }}
      onCancel={() => {
        setOpenModalViewCompany(false);
      }}
    >
      {loading ? (
        <></>
      ) : (
        dataCompanyDetail && (
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-4">
              <Avatar
                shape="square"
                src={dataCompanyDetail.logo}
                size="large"
                className="h-16 w-16"
                icon={<CiImageOn />}
              />
              <div>
                <h2 className="text-xl font-bold">{dataCompanyDetail.name}</h2>
                <p className="text-sm text-gray-500">
                  {dataCompanyDetail.company_type}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
                <p>Email: {dataCompanyDetail.company_email}</p>
                <p>Điện thoại: {dataCompanyDetail.phone}</p>
                <p>
                  Địa chỉ: {dataCompanyDetail.address},{" "}
                  {dataCompanyDetail.district}, {dataCompanyDetail.city},{" "}
                  {dataCompanyDetail.country}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Thông tin công ty</h3>
                <p>Mã số thuế: {dataCompanyDetail.tax_code}</p>
                <p>
                  Ngày thành lập:{" "}
                  {new Date(
                    dataCompanyDetail.date_of_establishment,
                  ).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p>Quy mô: {dataCompanyDetail.company_size}</p>
                <p>Ngày làm việc: {dataCompanyDetail.working_days}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Chính sách ngoài giờ</h3>
              <p className="whitespace-pre-line text-gray-600">
                {dataCompanyDetail.overtime_policy}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Mô tả</h3>
              <p>{dataCompanyDetail.description}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              {dataCompanyDetail.facebook && (
                <a
                  href={dataCompanyDetail.facebook}
                  className="text-blue-600 hover:underline"
                >
                  Facebook
                </a>
              )}
              {dataCompanyDetail.website && (
                <a
                  href={dataCompanyDetail.website}
                  className="text-blue-600 hover:underline"
                >
                  Website
                </a>
              )}
              {dataCompanyDetail.youtube && (
                <a
                  href={dataCompanyDetail.youtube}
                  className="text-blue-600 hover:underline"
                >
                  YouTube
                </a>
              )}
              {dataCompanyDetail.linked && (
                <a
                  href={dataCompanyDetail.linked}
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )
      )}
    </Modal>
  );
};

export default ModalViewCompany;
