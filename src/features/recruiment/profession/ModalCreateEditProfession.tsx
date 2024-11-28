import React from "react";
import { Form, Input, Modal } from "antd";
import { IProfessionRes, IProfessionReq } from "../../../interfaces";

interface ModalCreateEditProfessionProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateProfession: (values: IProfessionReq) => void;
  handleUpdateProfession: (id: number, values: IProfessionReq) => void;
  dataDetail: IProfessionRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IProfessionRes | null>>;
  openModalCreateEditProfession: boolean;
  setOpenModalCreateEditProfession: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditProfession: React.FC<ModalCreateEditProfessionProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateProfession,
  handleUpdateProfession,
  openModalCreateEditProfession,
  setOpenModalCreateEditProfession,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IProfessionReq) => {
    if (isCreate) {
      handleCreateProfession(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateProfession(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditProfession(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditProfession}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} nghề nghiệp`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditProfession(false)}
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
          label="Tên nghề nghiệp"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên nghề nghiệp không được để trống!",
            },
            {
              min: 3,
              message: "Tên nghề nghiệp phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên nghề nghiệp không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditProfession;
