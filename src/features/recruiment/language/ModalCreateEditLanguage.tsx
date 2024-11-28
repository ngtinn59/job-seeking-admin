import React from "react";
import { Form, Input, Modal } from "antd";
import { ILanguageRes, ILanguageReq } from "../../../interfaces";

interface ModalCreateEditLanguageProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateLanguage: (values: ILanguageReq) => void;
  handleUpdateLanguage: (id: number, values: ILanguageReq) => void;
  dataDetail: ILanguageRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ILanguageRes | null>>;
  openModalCreateEditLanguage: boolean;
  setOpenModalCreateEditLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateEditLanguage: React.FC<ModalCreateEditLanguageProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateLanguage,
  handleUpdateLanguage,
  openModalCreateEditLanguage,
  setOpenModalCreateEditLanguage,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: ILanguageReq) => {
    if (isCreate) {
      handleCreateLanguage(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateLanguage(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditLanguage(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditLanguage}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} ngôn ngữ`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditLanguage(false)}
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
          label="Tên ngôn ngữ"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên ngôn ngữ không được để trống!",
            },
            {
              min: 3,
              message: "Tên ngôn ngữ phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên ngôn ngữ không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditLanguage;
