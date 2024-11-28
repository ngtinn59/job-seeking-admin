import React from "react";
import { Form, Input, Modal } from "antd";
import { ICompanySizeRes, ICompanySizeReq } from "../../../interfaces";

interface ModalCreateEditSizeCompanyProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateSizeCompany: (values: ICompanySizeReq) => void;
  handleUpdateSizeCompany: (id: number, values: ICompanySizeReq) => void;
  dataDetail: ICompanySizeRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ICompanySizeRes | null>>;
  openModalCreateEditSizeCompany: boolean;
  setOpenModalCreateEditSizeCompany: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditSizeCompany: React.FC<ModalCreateEditSizeCompanyProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateSizeCompany,
  handleUpdateSizeCompany,
  openModalCreateEditSizeCompany,
  setOpenModalCreateEditSizeCompany,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: ICompanySizeReq) => {
    if (isCreate) {
      handleCreateSizeCompany(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateSizeCompany(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditSizeCompany(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditSizeCompany}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} quy mô công ty`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditSizeCompany(false)}
        destroyOnClose
        maskClosable={false}
        afterClose={() => {
          form.resetFields();
          setDataDetail(null);
        }}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            disabled={loading}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Quy mô công ty"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên quy mô công ty không được để trống!",
            },
            {
              min: 3,
              message: "Tên quy mô công ty phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên quy mô công ty không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditSizeCompany;
