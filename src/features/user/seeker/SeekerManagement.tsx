import { useCallback, useEffect, useState } from "react";
import { seekerService } from "../../../services";
import { ApiResponse, ISeekerReq, ISeekerRes } from "../../../interfaces";
import { Popconfirm, Space, Switch, Table, Tag, Tooltip } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import ButtonAdd from "../../../common/component/ButtonAdd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import ModalCreateEditSeeker from "./ModalCreateEditSeeker";
import SearchInput from "../../../common/component/SearchInput";
import { debounce } from "lodash";
import { TbFilterFilled } from "react-icons/tb";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
} from "../../../utils";

const SeekerManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditSeeker, setOpenModalCreateEditSeeker] =
    useState<boolean>(false);

  const [data, setData] = useState<ISeekerRes[]>([]);
  const [filteredData, setFilteredData] = useState<ISeekerRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<ISeekerRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchSeekers = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<ISeekerRes[]> = await seekerService.getAllSeeker();
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
    fetchSeekers();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.email.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
      setTotal(filtered.length);
    }, 300),
    [data],
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleSwitchChange = async (e: boolean, id: number) => {
    setLoading(true);
    if (e) {
      try {
        const res: ApiResponse<ISeekerRes> =
          await seekerService.unBlockSeeker(id);
        if (res && res.success) {
          toast.success(res.message || "Tài khoản đã được mở lại thành công");
          fetchSeekers();
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      }
      setLoading(false);
    }
    if (!e) {
      try {
        const res = await seekerService.blockSeeker(id);
        console.log(res);
        if (res && res.success) {
          toast.success(res.message || "Tài khoản đã bị chặn thành công");
          fetchSeekers();
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      }
    }
  };

  const handleDeleteSeeker = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<ISeekerRes> = await seekerService.deleteSeeker(id);
      console.log(res);
      if (res && res.success) {
        toast.success(res.message || "Xóa tài khoản thành công");
        fetchSeekers();
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleCreateSeeker = async (data: ISeekerReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ISeekerRes> =
        await seekerService.createSeeker(data);
      console.log(res);
      if (res && res.success) {
        toast.success(res.message || "Tạo tài khoản thành công");
        fetchSeekers();
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo tài khoản thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateSeeker = async (id: number, data: ISeekerReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<ISeekerRes> = await seekerService.updateSeekerById(
        id,
        data,
      );
      console.log(res);
      if (res && res.success) {
        toast.success(res.message || "Cập nhật tài khoản thành công");
        fetchSeekers();
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật tài khoản thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<ISeekerRes>["columns"] = [
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
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Email xác minh vào",
      dataIndex: "email_verified_at",
      key: "email_verified_at",
      render: (email_verified_at: string) => (
        <span>{email_verified_at ? email_verified_at : "--"}</span>
      ),
    },
    {
      title: "Loại tài khoản",
      dataIndex: "account_type",
      key: "account_type",
      filters: [
        { text: "Người tìm việc", value: "Người tìm việc" },
        { text: "Người tuyển dụng", value: "Người tuyển dụng" },
      ],
      filterIcon: (filtered: boolean) => (
        <TbFilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value, record) => record.account_type === value,
      render: (account_type: string) => (
        <Tag color={account_type === "Người tìm việc" ? "blue" : "red"}>
          {account_type}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Hoạt động", value: "Hoạt động" },
        { text: "Không hoạt động", value: "Không hoạt động" },
      ],
      filterIcon: (filtered: boolean) => (
        <TbFilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={status === "Hoạt động" ? "green" : "red"}>{status}</Tag>
      ),
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
      render: (created_at: string) => <span>{created_at}</span>,
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
      render: (updated_at: string) => <span>{updated_at}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record: ISeekerRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa thông tin tài khoản">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditSeeker(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa tài khoản này?"
            description="Bạn có chắc chắn muốn xóa tài khoản này không?"
            onConfirm={() => {
              handleDeleteSeeker(record?.id);
            }}
            onCancel={() => {}}
            okText="Có"
            cancelText="không"
          >
            <button className="text-xl text-red-500">
              <MdDelete />
            </button>
          </Popconfirm>
          <Tooltip
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
          </Tooltip>
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
          title="Thêm tài khoản"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditSeeker(true);
          }}
        />
      </div>
      <Table<ISeekerRes>
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
      <ModalCreateEditSeeker
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateSeeker={handleCreateSeeker}
        handleUpdateSeeker={handleUpdateSeeker}
        openModalCreateEditSeeker={openModalCreateEditSeeker}
        setOpenModalCreateEditSeeker={setOpenModalCreateEditSeeker}
      />
    </div>
  );
};

export default SeekerManagement;
