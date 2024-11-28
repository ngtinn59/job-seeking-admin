import { useCallback, useEffect, useState } from "react";
import { experienceService } from "../../../services";
import {
  ApiResponse,
  IExperienceRes,
  IExperienceReq,
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
import ModalCreateEditExperience from "./ModalCreateEditExperience";

const ManageExperience: React.FC = () => {
  const LIMIT = 10;

  const [openModalCreateEditExperience, setOpenModalCreateEditExperience] =
    useState<boolean>(false);

  const [data, setData] = useState<IExperienceRes[]>([]);
  const [filteredData, setFilteredData] = useState<IExperienceRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IExperienceRes | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IExperienceRes[]> =
        await experienceService.getAllExperience();
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
    fetchExperience();
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

  const handleDeleteExperience = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IExperienceRes> =
        await experienceService.deleteExperience(id);
      if (res && res.success) {
        fetchExperience();
        toast.success(res.message || "Xóa số năm kinh nghiệm thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      fetchExperience();
      toast.error("Xóa số năm kinh nghiệm thất bại");
    }
    setLoading(false);
  };

  const handleCreateExperience = async (data: IExperienceReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IExperienceRes> =
        await experienceService.createExperience(data);
      console.log(res);
      if (res && res.success) {
        fetchExperience();
        toast.success(res.message || "Tạo số năm kinh nghiệm thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Tạo số năm kinh nghiệm thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchExperience();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const handleUpdateExperience = async (id: number, data: IExperienceReq) => {
    setLoading(true);
    try {
      const res: ApiResponse<IExperienceRes> =
        await experienceService.updateExperienceById(id, data);
      console.log(res);
      if (res && res.success) {
        fetchExperience();
        toast.success(res.message || "Cập nhật số năm kinh nghiệm thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Cập nhật số năm kinh nghiệm thất bại");
      }
    } catch (error) {
      console.log(error);
      fetchExperience();
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
    setLoading(false);
  };

  const columns: TableProps<IExperienceRes>["columns"] = [
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
      title: "Số năm kinh nghiệm",
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
      render: (_, record: IExperienceRes) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa tên số năm kinh nghiệm">
            <button
              onClick={() => {
                setDataDetail(record);
                setIsCreate(false);
                setOpenModalCreateEditExperience(true);
              }}
              className="text-xl text-yellow-500"
            >
              <FaEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa số năm kinh nghiệm?"
            description="Bạn có chắc chắn muốn xóa số năm kinh nghiệm này?"
            onConfirm={() => {
              handleDeleteExperience(record?.id);
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
          title="Thêm số năm kinh nghiệm"
          onClick={() => {
            setIsCreate(true);
            setOpenModalCreateEditExperience(true);
          }}
        />
      </div>
      <Table<IExperienceRes>
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
      <ModalCreateEditExperience
        isCreate={isCreate}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loading={loading}
        handleCreateExperience={handleCreateExperience}
        handleUpdateExperience={handleUpdateExperience}
        openModalCreateEditExperience={openModalCreateEditExperience}
        setOpenModalCreateEditExperience={setOpenModalCreateEditExperience}
      />
    </div>
  );
};

export default ManageExperience;
