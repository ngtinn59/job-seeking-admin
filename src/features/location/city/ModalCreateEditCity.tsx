import React, { useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import {
  ICityRes,
  ICityReq,
  ApiResponse,
  ICountryRes,
} from "../../../interfaces";
import { countryService } from "../../../services";

interface ModalCreateEditCityProps {
  isCreate: boolean;
  loading: boolean;
  handleCreateCity: (values: ICityReq) => void;
  handleUpdateCity: (id: number, values: ICityReq) => void;
  dataDetail: ICityRes | null;
  setDataDetail: React.Dispatch<React.SetStateAction<ICityRes | null>>;
  openModalCreateEditCity: boolean;
  setOpenModalCreateEditCity: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateEditCity: React.FC<ModalCreateEditCityProps> = ({
  isCreate,
  dataDetail,
  setDataDetail,
  loading,
  handleCreateCity,
  handleUpdateCity,
  openModalCreateEditCity,
  setOpenModalCreateEditCity,
}) => {
  const [dataCountries, setCountries] = React.useState<ICountryRes[]>([]);
  const [form] = Form.useForm();
  const onCreate = (values: ICityReq) => {
    if (isCreate) {
      handleCreateCity(values);
    }
    if (!isCreate) {
      if (dataDetail?.id !== undefined) {
        handleUpdateCity(dataDetail.id, values);
      }
    }
    setOpenModalCreateEditCity(false);
  };

  const fetchCountry = async () => {
    try {
      const res: ApiResponse<ICountryRes[]> =
        await countryService.getAllCountries();
      if (res && res.success) {
        setCountries(res.data);
      }
    } catch (error) {
      console.log(error);
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <>
      <Modal
        open={openModalCreateEditCity}
        title={`${isCreate ? "Tạo" : "Chỉnh sửa"} thành phố`}
        okText={`${isCreate ? "Tạo" : "Lưu"}`}
        cancelText="Cancel"
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading,
        }}
        onCancel={() => setOpenModalCreateEditCity(false)}
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
          label="Tên thành phố"
          initialValue={dataDetail?.name}
          rules={[
            {
              required: true,
              message: "Tên thành phố không được để trống!",
            },
            {
              min: 3,
              message: "Tên thành phố phải có ít nhất 3 ký tự!",
            },
            {
              max: 255,
              message: "Tên thành phố không được vượt quá 255 ký tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country_id"
          label="Quốc gia"
          initialValue={dataDetail?.country?.id}
          rules={[
            {
              required: true,
              message: "Quốc gia không được để trống!",
            },
          ]}
        >
          <Select>
            {dataCountries.map((country) => (
              <Select.Option key={country.id} value={country.id}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalCreateEditCity;
