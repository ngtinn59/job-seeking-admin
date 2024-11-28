import { useCallback, useEffect, useState } from "react";
import { professionService } from "../../../services";
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
import ModalCreateEditProfession from "./ModalCreateEditProfession";

const ManageProfession: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditProfession, setOpenModalCreateEditProfession] =
    useState<boolean>(false);

  const [data, setData] = useState<IProfessionRes[]>([]);
  const [filteredData, setFilteredData] = useState<IProfessionRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IProfessionRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchProfession = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes[]> =
        await professionService.getAllProfession();
      console.log(res);
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
    fetchProfession();
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

  const handleDeleteProfession = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await professionService.deleteProfession(id);
      if (res && res.success) {
        fetchProfession();
        toast.success(res.message || "Xóa nghề nghiệp thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchProfession();
      toast.error("Xóa nghề nghiệp thất bại");
    }
    setLoading(false);
  };

  const handleCreateProfession = async (data: IProfessionReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await professionService.createProfession(data);
      console.log(res);
      if (res && res.success) {
        fetchProfession();
        toast.success(res.message || "Tạo nghề nghiệp thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo nghề nghiệp thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchProfession();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateProfession = async (id: number, data: IProfessionReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IProfessionRes> =
        await professionService.updateProfessionById(id, data);
      console.log(res);
      if (res && res.success) {
        fetchProfession();
        toast.success(res.message || "Cập nhật nghề nghiệp thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật nghề nghiệp thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchProfession();
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
      title: "Nghề nghiệp",
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
          <Tooltip title="Chỉnh sửa tên nghề nghiệp">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditProfession(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa nghề nghiệp?"
            description="Bạn có chắc chắn muốn xóa nghề nghiệp này?"
            onConfirm={() => {
              handleDeleteProfession(record?.id);
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
          title="Thêm nghề nghiệp"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditProfession(true);
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
          onShowSizeChange(_current, size) {
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
      <ModalCreateEditProfession
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateProfession={handleCreateProfession}
        handleUpdateProfession={handleUpdateProfession}
        openModalCreateEditProfession={openModalCreateEditProfession}
        setOpenModalCreateEditProfession={setOpenModalCreateEditProfession}
      />
    </div>
  );
};

export default ManageProfession;
