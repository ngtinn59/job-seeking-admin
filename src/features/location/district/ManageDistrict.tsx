import { useCallback, useEffect, useState } from "react";
import { districtService } from "../../../services";
import { ApiResponse, IDistrictRes, IDistrictReq } from "../../../interfaces";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import ButtonAdd from "../../../common/component/ButtonAdd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import SearchInput from "../../../common/component/SearchInput";
import { debounce } from "lodash";
import { colorSortDownIcon, colorSortUpIcon } from "../../../utils";
import ModalCreateEditDistrict from "./ModalCreateEditDistrict";

const ManageDistrict: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditDistrict, setOpenModalCreateEditDistrict] =
    useState<boolean>(false);

  const [data, setData] = useState<IDistrictRes[]>([]);
  const [filteredData, setFilteredData] = useState<IDistrictRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IDistrictRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchDistrict = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IDistrictRes[]> =
        await districtService.getAllDistricts();
      if (res && res.status_code === 200) {
        setData(res.data);
        setTotal(res.data.length);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.city.name.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
      setTotal(filtered.length);
    }, 300),
    [data],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleDeleteDistrict = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDistrictRes> =
        await districtService.deleteDistrict(id);
      if (res && res.success) {
        fetchDistrict();
        toast.success(res.message || "Xóa quận huyện thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchDistrict();
      toast.error("Xóa quận huyện thất bại");
    }
    setLoading(false);
  };

  const handleCreateDistrict = async (data: IDistrictReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDistrictRes> =
        await districtService.createDistrict(data);
      console.log(res);
      if (res && res.success) {
        fetchDistrict();
        toast.success("Tạo quận huyện thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo quận huyện thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchDistrict();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateDistrict = async (id: number, data: IDistrictReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDistrictRes> =
        await districtService.updateDistrict(id, data);
      if (res && res.success) {
        fetchDistrict();
        toast.success("Cập nhật quận huyện thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật quận huyện thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchDistrict();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<IDistrictRes>["columns"] = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Quận huyện",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
      render: (city) => <span>{city ? city?.name : "--"}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
      render: (created_at: string) => (
        <span>
          {created_at ? (
            <>
              {new Date(created_at).toLocaleTimeString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </>
          ) : (
            "--"
          )}
        </span>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
      render: (updated_at: string) => (
        <span>
          {updated_at ? (
            <>
              {new Date(updated_at).toLocaleTimeString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </>
          ) : (
            "--"
          )}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record: IDistrictRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên quận huyện">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditDistrict(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa quận huyện?"
            description="Bạn có chắc chắn muốn xóa quận huyện này?"
            onConfirm={() => {
              handleDeleteDistrict(record?.id);
            }}
            onCancel={() => {}}
            okText="Có"
            cancelText="không"
          >
            <button className="text-xl text-red-500">
              <MdDelete />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="">
          <SearchInput
            searh={search}
            setSearch={setSearch}
            placeholder="Tìm kiếm"
          />
        </div>
        <ButtonAdd
          title="Thêm quận huyện"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditDistrict(true);
          }}
        />
      </div>
      <Table<IDistrictRes>
        rowKey="id"
        size="small"
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          total: total,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
          onShowSizeChange(current, size) {
            setCurrentPage(1);
            setPageSize(size);
          },
          showTotal: (total) => `Tổng: ${total}`,
          onChange(page, pageSize) {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      <ModalCreateEditDistrict
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateDistrict={handleCreateDistrict}
        handleUpdateDistrict={handleUpdateDistrict}
        openModalCreateEditDistrict={openModalCreateEditDistrict}
        setOpenModalCreateEditDistrict={setOpenModalCreateEditDistrict}
      />
    </div>
  );
};

export default ManageDistrict;
