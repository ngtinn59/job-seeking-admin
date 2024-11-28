import { useCallback, useEffect, useState } from "react";
import { companyTypeService } from "../../../services";
import {
  ApiResponse,
  ICompanyTypeRes,
  ICompanyTypeReq,
} from "../../../interfaces";
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
import ModalCreateEditTypeCompany from "./ModalCreateEditTypeCompany";

const TypeCompanyManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditTypeCompany, setOpenModalCreateEditTypeCompany] =
    useState<boolean>(false);

  const [data, setData] = useState<ICompanyTypeRes[]>([]);
  const [filteredData, setFilteredData] = useState<ICompanyTypeRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<ICompanyTypeRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchTypeCompany = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyTypeRes[]> =
        await companyTypeService.getAllCompanyType();
      if (res && res.success) {
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
    fetchTypeCompany();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
      setTotal(filtered.length);
    }, 300),
    [data],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleDeleteTypeCompany = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyTypeRes> =
        await companyTypeService.deleteCompanyType(id);
      if (res && res.success) {
        fetchTypeCompany();
        toast.success(res.message || "Xóa loại công ty thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchTypeCompany();
      toast.error("Xóa loại công ty thất bại");
    }
    setLoading(false);
  };

  const handleCreateTypeCompany = async (data: ICompanyTypeReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyTypeRes> =
        await companyTypeService.createCompanyType(data);
      if (res && res.success) {
        fetchTypeCompany();
        toast.success(res.message || "Tạo loại công ty thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo loại công ty thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchTypeCompany();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateTypeCompany = async (id: number, data: ICompanyTypeReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyTypeRes> =
        await companyTypeService.updateCompanyTypeById(id, data);
      if (res && res.success) {
        fetchTypeCompany();
        toast.success(res.message || "Cập nhật loại công ty thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật loại công ty thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchTypeCompany();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<ICompanyTypeRes>["columns"] = [
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
      title: "Tên loại công ty",
      dataIndex: "name",
      key: "name",
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
      render: (_, record: ICompanyTypeRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên loại công ty">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditTypeCompany(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa loại công ty?"
            description="Bạn có chắc chắn muốn xóa loại công ty này?"
            onConfirm={() => {
              handleDeleteTypeCompany(record?.id);
            }}
            onCancel={() => {}}
            okText="Có"
            cancelText="không"
          >
            <button className="text-xl text-red-500">
              <MdDelete />
            </button>
          </Popconfirm>
          {/* <Tooltip
            title={
              record?.status === "Hoạt động" ? "Chặn tài khoản" : "Mở tài khoản"
            }
          >
            <Switch
              className="mb-1.5"
              size="small"
              checked={record.status === "Hoạt động" ? true : false}
              onChange={(e: boolean) => {
                handleSwitchChange(e, record.id);
              }}
            />
          </Tooltip> */}
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
          title="Thêm loại công ty"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditTypeCompany(true);
          }}
        />
      </div>
      <Table<ICompanyTypeRes>
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
            console.log(current, size);
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
      <ModalCreateEditTypeCompany
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateTypeCompany={handleCreateTypeCompany}
        handleUpdateTypeCompany={handleUpdateTypeCompany}
        openModalCreateEditTypeCompany={openModalCreateEditTypeCompany}
        setOpenModalCreateEditTypeCompany={setOpenModalCreateEditTypeCompany}
      />
    </div>
  );
};

export default TypeCompanyManagement;
