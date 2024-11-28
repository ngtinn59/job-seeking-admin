import React from "react";
import { Form, Input, Modal } from "antd";
import { ICompanyTypeRes, ICompanyTypeReq } from "../../../interfaces";

interface ModalCreateEditTypeCompanyProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateTypeCompany: (values: ICompanyTypeReq) => void;
  handleUpdateTypeCompany: (id: number, values: ICompanyTypeReq) => void;
  dataDetail: ICompanyTypeRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ICompanyTypeRes | null>>;
  openModalCreateEditTypeCompany: boolean;
  setOpenModalCreateEditTypeCompany: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditTypeCompany: React.FC<ModalCreateEditTypeCompanyProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,

  handleCreateTypeCompany,
  handleUpdateTypeCompany,
  openModalCreateEditTypeCompany,
  setOpenModalCreateEditTypeCompany,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: ICompanyTypeReq) => {
    if (isCreate) {
      handleCreateTypeCompany(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateTypeCompany(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditTypeCompany(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditTypeCompany}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} loại công ty`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditTypeCompany(false)}
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
          label="Tên loại công ty"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên loại công ty không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditTypeCompany;
