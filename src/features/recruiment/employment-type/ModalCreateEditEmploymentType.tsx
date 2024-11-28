import React from "react";
import { Form, Input, Modal } from "antd";
import { IWorkTypeRes, IWorkTypeReq } from "../../../interfaces";

interface ModalCreateEditEmploymentTypeProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateEmploymentType: (values: IWorkTypeReq) => void;
  handleUpdateEmploymentType: (id: number, values: IWorkTypeReq) => void;
  dataDetail: IWorkTypeRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IWorkTypeRes | null>>;
  openModalCreateEditEmploymentType: boolean;
  setOpenModalCreateEditEmploymentType: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditEmploymentType: React.FC<
  ModalCreateEditEmploymentTypeProps
> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateEmploymentType,
  handleUpdateEmploymentType,
  openModalCreateEditEmploymentType,
  setOpenModalCreateEditEmploymentType,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IWorkTypeReq) => {
    if (isCreate) {
      handleCreateEmploymentType(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateEmploymentType(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditEmploymentType(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditEmploymentType}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} hình thức làm việc`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditEmploymentType(false)}
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
          label="Tên hình thức làm việc"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên hình thức làm việc không được để trống!",
            },
            {
              min: 3,
              message: "Tên hình thức làm việc phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên hình thức làm việc không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditEmploymentType;
