import { useCallback, useEffect, useState } from "react";
import { companySizeService } from "../../../services";
import {
  ApiResponse,
  ICompanySizeRes,
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
import ModalCreateEditSizeCompany from "./ModalCreateEditSizeCompany";

const SizeCompanyManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditSizeCompany, setOpenModalCreateEditSizeCompany] =
    useState<boolean>(false);

  const [data, setData] = useState<ICompanySizeRes[]>([]);
  const [filteredData, setFilteredData] = useState<ICompanySizeRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<ICompanySizeRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchSizeCompany = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanySizeRes[]> =
        await companySizeService.getAllCompanySize();
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
    fetchSizeCompany();
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

  const handleDeleteSizeCompany = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanySizeRes> =
        await companySizeService.deleteCompanySize(id);
      if (res && res.success) {
        fetchSizeCompany();
        toast.success(res.message || "Xóa quy mô công ty thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchSizeCompany();
      toast.error("Xóa quy mô công ty thất bại");
    }
    setLoading(false);
  };

  const handleCreateSizeCompany = async (data: ICompanyTypeReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanySizeRes> =
        await companySizeService.createCompanySize(data);
      console.log(res);
      if (res && res.success) {
        fetchSizeCompany();
        toast.success(res.message || "Tạo quy mô công ty thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo quy mô công ty thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchSizeCompany();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateSizeCompany = async (id: number, data: ICompanyTypeReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanySizeRes> =
        await companySizeService.updateCompanySizeById(id, data);
      console.log(res);
      if (res && res.success) {
        fetchSizeCompany();
        toast.success(res.message || "Cập nhật quy mô công ty thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật quy mô công ty thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchSizeCompany();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<ICompanySizeRes>["columns"] = [
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
      title: "Quy mô công ty",
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
      render: (_, record: ICompanySizeRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên quy mô công ty">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditSizeCompany(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa quy mô công ty?"
            description="Bạn có chắc chắn muốn xóa quy mô công ty này?"
            onConfirm={() => {
              handleDeleteSizeCompany(record?.id);
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
          title="Thêm quy mô công ty"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditSizeCompany(true);
          }}
        />
      </div>
      <Table<ICompanySizeRes>
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
      <ModalCreateEditSizeCompany
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateSizeCompany={handleCreateSizeCompany}
        handleUpdateSizeCompany={handleUpdateSizeCompany}
        openModalCreateEditSizeCompany={openModalCreateEditSizeCompany}
        setOpenModalCreateEditSizeCompany={setOpenModalCreateEditSizeCompany}
      />
    </div>
  );
};

export default SizeCompanyManagement;
