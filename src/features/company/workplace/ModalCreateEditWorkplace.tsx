import React from "react";
import { Form, Input, Modal } from "antd";
import { IWorkplaceRes, IWorkplaceReq } from "../../../interfaces";

interface ModalCreateEditWorkplaceProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateWorkplace: (values: IWorkplaceReq) => void;
  handleUpdateWorkplace: (id: number, values: IWorkplaceReq) => void;
  dataDetail: IWorkplaceRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IWorkplaceRes | null>>;
  openModalCreateEditWorkplace: boolean;
  setOpenModalCreateEditWorkplace: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditWorkplace: React.FC<ModalCreateEditWorkplaceProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,

  handleCreateWorkplace,
  handleUpdateWorkplace,
  openModalCreateEditWorkplace,
  setOpenModalCreateEditWorkplace,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IWorkplaceReq) => {
    if (isCreate) {
      handleCreateWorkplace(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateWorkplace(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditWorkplace(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditWorkplace}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} nơi làm việc`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditWorkplace(false)}
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
          label="Tên nơi làm việc"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên nơi làm việc không được để trống!",
            },
            {
              min: 3,
              message: "Tên nơi làm việc phải có ít nhất 3 ký tự",
            },
            {
              max: 255,
              message: "Tên nơi làm việc không được vượt quá 255 ký tự",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditWorkplace;
