import React from "react";
import { Form, Input, Modal } from "antd";
import { ICountryRes, ICountryReq } from "../../../interfaces";

interface ModalCreateEditCountryProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateCountry: (values: ICountryReq) => void;
  handleUpdateCountry: (id: number, values: ICountryReq) => void;
  dataDetail: ICountryRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ICountryRes | null>>;
  openModalCreateEditCountry: boolean;
  setOpenModalCreateEditCountry: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateEditCountry: React.FC<ModalCreateEditCountryProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateCountry,
  handleUpdateCountry,
  openModalCreateEditCountry,
  setOpenModalCreateEditCountry,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: ICountryReq) => {
    if (isCreate) {
      handleCreateCountry(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateCountry(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditCountry(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditCountry}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} quốc gia`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditCountry(false)}
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
          label="Tên quốc gia"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên quốc gia không được để trống!",
            },
            {
              min: 3,
              message: "Tên quốc gia phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên quốc gia không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditCountry;
