import React from "react";
import { Form, Input, Modal } from "antd";
import { ISeekerRes, ISeekerReq } from "../../../interfaces";

interface ModalCreateEditSeekerProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateSeeker: (values: ISeekerReq) => void;
  handleUpdateSeeker: (id: number, values: ISeekerReq) => void;
  dataDetail: ISeekerRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ISeekerRes | null>>;
  openModalCreateEditSeeker: boolean;
  setOpenModalCreateEditSeeker: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateEditSeeker: React.FC<ModalCreateEditSeekerProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,

  handleCreateSeeker,
  handleUpdateSeeker,
  openModalCreateEditSeeker,
  setOpenModalCreateEditSeeker,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: ISeekerReq) => {
    if (isCreate) {
      handleCreateSeeker(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateSeeker(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditSeeker(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditSeeker}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} tài khoản`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditSeeker(false)}
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
          label="Họ tên"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          initialValue={dataDetail?.email}
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
            },
            {
              type: "email",
              message: "Email không đúng định dạng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
            {
              min: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự!",
            },
            {
              max: 32,
              message: "Mật khẩu không được quá 32 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditSeeker;
