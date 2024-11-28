import React from "react";
import { Form, Input, Modal } from "antd";
import { IEducationRes, IEducationReq } from "../../../interfaces";

interface ModalCreateEditEducationProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateEducation: (values: IEducationReq) => void;
  handleUpdateEducation: (id: number, values: IEducationReq) => void;
  dataDetail: IEducationRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IEducationRes | null>>;
  openModalCreateEditEducation: boolean;
  setOpenModalCreateEditEducation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditEducation: React.FC<ModalCreateEditEducationProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateEducation,
  handleUpdateEducation,
  openModalCreateEditEducation,
  setOpenModalCreateEditEducation,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IEducationReq) => {
    if (isCreate) {
      handleCreateEducation(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateEducation(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditEducation(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditEducation}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} cấp độ học`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditEducation(false)}
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
          label="Tên cấp độ học"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên cấp độ học không được để trống!",
            },
            {
              min: 3,
              message: "Tên cấp độ học phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên cấp độ học không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditEducation;
