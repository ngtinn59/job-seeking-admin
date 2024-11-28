import React from "react";
import { Form, Input, Modal } from "antd";
import { IDesiredPositionRes, IDesiredPositionReq } from "../../../interfaces";

interface ModalCreateEditDesiredPostionProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateDesiredPosition: (values: IDesiredPositionReq) => void;
  handleUpdateDesiredPosition: (
    id: number,
    values: IDesiredPositionReq,
  ) => void;
  dataDetail: IDesiredPositionRes | null;
  setDataDetail: React.Dispatch<
    React.SetStateAction<IDesiredPositionRes | null>
  >;
  openModalCreateEditDesiredPostion: boolean;
  setOpenModalCreateEditDesiredPostion: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ModalCreateEditDesiredPostion: React.FC<
  ModalCreateEditDesiredPostionProps
> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateDesiredPosition,
  handleUpdateDesiredPosition,
  openModalCreateEditDesiredPostion,
  setOpenModalCreateEditDesiredPostion,
}) => {
  const [form] = Form.useForm();
  const onCreate = (values: IDesiredPositionReq) => {
    if (isCreate) {
      handleCreateDesiredPosition(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateDesiredPosition(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditDesiredPostion(false);
  };

  return (
    <>
      <Modal
        open={openModalCreateEditDesiredPostion}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} cấp bậc mong muốn`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditDesiredPostion(false)}
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
          label="Tên cấp bậc mong muốn"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên cấp bậc mong muốn không được để trống!",
            },
            {
              min: 3,
              message: "Tên cấp bậc mong muốn phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên cấp bậc mong muốn không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditDesiredPostion;
