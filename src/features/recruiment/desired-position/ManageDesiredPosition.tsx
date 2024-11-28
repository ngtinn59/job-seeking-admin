import { useCallback, useEffect, useState } from "react";
import { desiredPositionService } from "../../../services";
import {
  ApiResponse,
  IDesiredPositionRes,
  IDesiredPositionReq,
} from "../../../interfaces";
import { Popconfirm, Space, Table, Tooltip } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import type { TableProps } from "antd";
import ButtonAdd from "../../../common/component/ButtonAdd";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import SearchInput from "../../../common/component/SearchInput";
import { debounce } from "lodash";
import { colorSortDownIcon, colorSortUpIcon } from "../../../utils";
import ModalCreateEditDesiredPostion from "./ModalCreateEditDesiredPostion";
import { MdDelete } from "react-icons/md";

const ManageDesiredPosition: React.FC = () => {
  const LIMIT = 10;

  const [
    openModalCreateEditDesiredPostion,
    setOpenModalCreateEditDesiredPostion,
  ] = useState<boolean>(false);

  const [data, setData] = useState<IDesiredPositionRes[]>([]);
  const [filteredData, setFilteredData] = useState<IDesiredPositionRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IDesiredPositionRes | null>(
    null,
  );
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchDesiredPosition = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IDesiredPositionRes[]> =
        await desiredPositionService.getAllDesiredPosition();
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
    fetchDesiredPosition();
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

  const handleDeleteDesiredPosition = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDesiredPositionRes> =
        await desiredPositionService.deleteDesiredPositionById(id);
      if (res && res.success) {
        fetchDesiredPosition();
        toast.success(res.message || "Xóa cấp bậc mong muốn thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchDesiredPosition();
      toast.error("Xóa cấp bậc mong muốn thất bại");
    }
    setLoading(false);
  };

  const handleCreateDesiredPosition = async (data: IDesiredPositionReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDesiredPositionRes> =
        await desiredPositionService.createDesiredPosition(data);
      console.log(res);
      if (res && res.success) {
        fetchDesiredPosition();
        toast.success(res.message || "Tạo cấp bậc mong muốn thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo cấp bậc mong muốn thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchDesiredPosition();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateDesiredPosition = async (
    id: number,
    data: IDesiredPositionReq,
  ) => {
    setLoading(true);
    try {
      const res: ApiResponse<IDesiredPositionRes> =
        await desiredPositionService.updateDesiredPositionById(id, data);
      console.log(res);
      if (res && res.success) {
        fetchDesiredPosition();
        toast.success(res.message || "Cập nhật cấp bậc mong muốn thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật cấp bậc mong muốn thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchDesiredPosition();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<IDesiredPositionRes>["columns"] = [
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
      title: "Cấp bậc mong muốn",
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
      render: (_, record: IDesiredPositionRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên cấp bậc mong muốn">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditDesiredPostion(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa cấp bậc mong muốn?"
            description="Bạn có chắc chắn muốn xóa cấp bậc mong muốn này?"
            onConfirm={() => {
              handleDeleteDesiredPosition(record?.id);
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
          title="Thêm cấp bậc mong muốn"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditDesiredPostion(true);
          }}
        />
      </div>
      <Table<IDesiredPositionRes>
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
      <ModalCreateEditDesiredPostion
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateDesiredPosition={handleCreateDesiredPosition}
        handleUpdateDesiredPosition={handleUpdateDesiredPosition}
        openModalCreateEditDesiredPostion={openModalCreateEditDesiredPostion}
        setOpenModalCreateEditDesiredPostion={
          setOpenModalCreateEditDesiredPostion
        }
      />
    </div>
  );
};

export default ManageDesiredPosition;
