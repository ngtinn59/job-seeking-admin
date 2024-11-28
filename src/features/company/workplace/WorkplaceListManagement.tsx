import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ButtonAdd from "../../../common/component/ButtonAdd";
import SearchInput from "../../../common/component/SearchInput";
import { ApiResponse, IWorkplaceReq, IWorkplaceRes } from "../../../interfaces";
import { workplaceService } from "../../../services";
import { colorSortDownIcon, colorSortUpIcon } from "../../../utils";
import ModalCreateEditWorkplace from "./ModalCreateEditWorkplace";

const WorkplaceListManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditWorkplace, setOpenModalCreateEditWorkplace] =
    useState<boolean>(false);

  const [data, setData] = useState<IWorkplaceRes[]>([]);
  const [filteredData, setFilteredData] = useState<IWorkplaceRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IWorkplaceRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchWorkplace = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IWorkplaceRes[]> =
        await workplaceService.getAllWorkplace();
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
    fetchWorkplace();
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

  const handleDeleteWorkplace = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IWorkplaceRes> =
        await workplaceService.deleteWorkplace(id);
      if (res && res.success) {
        fetchWorkplace();
        toast.success(res.message || "Xóa nơi làm việc thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchWorkplace();
      toast.error("Xóa nơi làm việc thất bại");
    }
    setLoading(false);
  };

  const handleCreateWorkplace = async (data: IWorkplaceReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IWorkplaceRes> =
        await workplaceService.createWorkplace(data);
      if (res && res.success) {
        fetchWorkplace();
        toast.success(res.message || "Tạo nơi làm việc thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo nơi làm việc thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchWorkplace();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateWorkplace = async (id: number, data: IWorkplaceReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IWorkplaceRes> =
        await workplaceService.updateWorkplaceById(id, data);
      if (res && res.success) {
        fetchWorkplace();
        toast.success(res.message || "Cập nhật nơi làm việc thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật nơi làm việc thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchWorkplace();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<IWorkplaceRes>["columns"] = [
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
      title: "Tên nơi làm việc",
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
      render: (_, record: IWorkplaceRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên nơi làm việc">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditWorkplace(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa nơi làm việc?"
            description="Bạn có chắc chắn muốn xóa nơi làm việc này?"
            onConfirm={() => {
              handleDeleteWorkplace(record?.id);
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
          title="Thêm nơi làm việc"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditWorkplace(true);
          }}
        />
      </div>
      <Table<IWorkplaceRes>
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
      <ModalCreateEditWorkplace
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateWorkplace={handleCreateWorkplace}
        handleUpdateWorkplace={handleUpdateWorkplace}
        openModalCreateEditWorkplace={openModalCreateEditWorkplace}
        setOpenModalCreateEditWorkplace={setOpenModalCreateEditWorkplace}
      />
    </div>
  );
};

export default WorkplaceListManagement;
