import { useCallback, useEffect, useState } from "react";
import { workTypeService } from "../../../services";
import {
  ApiResponse,
  IProfessionRes,
  IProfessionReq,
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
import ModalCreateEditEmploymentType from "./ModalCreateEditEmploymentType";

const ManageEmploymentType: React.FC = () => {
  const LIMIT = 10;

  const [
    openModalCreateEditEmploymentType,
    setOpenModalCreateEditEmploymentType,
  ] = useState<boolean>(false);

  const [data, setData] = useState<IProfessionRes[]>([]);
  const [filteredData, setFilteredData] = useState<IProfessionRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IProfessionRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchEmploymentType = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes[]> =
        await workTypeService.getAllWorkType();
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
    fetchEmploymentType();
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

  const handleDeleteEmploymentType = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await workTypeService.deleteWorkType(id);
      if (res && res.success) {
        fetchEmploymentType();
        toast.success(res.message || "Xóa hình thức làm việc thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchEmploymentType();
      toast.error("Xóa hình thức làm việc thất bại");
    }
    setLoading(false);
  };

  const handleCreateEmploymentType = async (data: IProfessionReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await workTypeService.createWorkType(data);
      console.log(res);
      if (res && res.success) {
        fetchEmploymentType();
        toast.success(res.message || "Tạo hình thức làm việc thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo hình thức làm việc thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchEmploymentType();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateEmploymentType = async (
    id: number,
    data: IProfessionReq,
  ) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await workTypeService.updateWorkTypeById(id, data);
      console.log(res);
      if (res && res.success) {
        fetchEmploymentType();
        toast.success(res.message || "Cập nhật hình thức làm việc thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật hình thức làm việc thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchEmploymentType();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<IProfessionRes>["columns"] = [
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
      title: "Hình thức làm việc",
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
      render: (_, record: IProfessionRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên hình thức làm việc">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditEmploymentType(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa hình thức làm việc?"
            description="Bạn có chắc chắn muốn xóa hình thức làm việc này?"
            onConfirm={() => {
              handleDeleteEmploymentType(record?.id);
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
          title="Thêm hình thức làm việc"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditEmploymentType(true);
          }}
        />
      </div>
      <Table<IProfessionRes>
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
      <ModalCreateEditEmploymentType
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateEmploymentType={handleCreateEmploymentType}
        handleUpdateEmploymentType={handleUpdateEmploymentType}
        openModalCreateEditEmploymentType={openModalCreateEditEmploymentType}
        setOpenModalCreateEditEmploymentType={
          setOpenModalCreateEditEmploymentType
        }
      />
    </div>
  );
};

export default ManageEmploymentType;
