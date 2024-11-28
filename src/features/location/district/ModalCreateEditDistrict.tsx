import React, { useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import {
  IDistrictRes,
  IDistrictReq,
  ApiResponse,
  ICityRes,
} from "../../../interfaces";
import { cityService } from "../../../services";

interface ModalCreateEditDistrictProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateDistrict: (values: IDistrictReq) => void;
  handleUpdateDistrict: (id: number, values: IDistrictReq) => void;
  dataDetail: IDistrictRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<IDistrictRes | null>>;
  openModalCreateEditDistrict: boolean;
  setOpenModalCreateEditDistrict: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateEditDistrict: React.FC<ModalCreateEditDistrictProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateDistrict,
  handleUpdateDistrict,
  openModalCreateEditDistrict,
  setOpenModalCreateEditDistrict,
}) => {
  const [dataCity, setCity] = React.useState<ICityRes[]>([]);
  const [form] = Form.useForm();
  const onCreate = (values: IDistrictReq) => {
    if (isCreate) {
      handleCreateDistrict(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateDistrict(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditDistrict(false);
  };

  const fetchCountry = async () => {
    try {
      const res: ApiResponse<ICityRes[]> = await cityService.getAllCities();
      if (res && res.success) {
        setCity(res.data);
      }
    } catch (error) {
      console.log(error);
      setCity([]);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <>
      <Modal
        open={openModalCreateEditDistrict}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} quận huyện`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditDistrict(false)}
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
          label="Tên quận huyện"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên quận huyện không được để trống!",
            },
            {
              min: 3,
              message: "Tên quận huyện phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên quận huyện không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city_id"
          label="Thành phố"
          initialValue={dataDetail?.city?.id}
          rules={[
            {
              required: true,
              message: "Thành phố không được để trống!",
            },
          ]}
        >
          <Select>
            {dataCity.map((city) => (
              <Select.Option key={city.id} value={city.id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditDistrict;
