import React from "react";
import { Form, Input, Modal } from "antd";
import { IExperienceRes, IExperienceReq } from "../../../interfaces";

interface ModalCreateEditExperienceProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateExperience: (values: IExperienceReq) => void;
  handleUpdateExperience: (id: number, values: IExperienceReq) => void;
  dataDetail: IExperienceRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IExperienceRes | null>>;
  openModalCreateEditExperience: boolean;
  setOpenModalCreateEditExperience: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditExperience: React.FC<ModalCreateEditExperienceProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateExperience,
  handleUpdateExperience,
  openModalCreateEditExperience,
  setOpenModalCreateEditExperience,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IExperienceReq) => {
    if (isCreate) {
      handleCreateExperience(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateExperience(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditExperience(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditExperience}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} số năm kinh nghiệm`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditExperience(false)}
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
          label="Tên số năm kinh nghiệm"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Số năm kinh nghiệm không được để trống!",
            },
            {
              min: 3,
              message: "Số năm kinh nghiệm phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Số năm kinh nghiệm không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditExperience;
