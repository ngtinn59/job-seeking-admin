import { useCallback, useEffect, useState } from "react";
import { postJobService } from "../../services";
import { ApiResponse, IJobPostingRes } from "../../interfaces";
import { Popconfirm, Space, Switch, Table, Tag, Tooltip } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import type { TableProps } from "antd";
import { MdDelete } from "react-icons/md";
import { TbFilterFilled } from "react-icons/tb";
import toast from "react-hot-toast";
import SearchInput from "../../common/component/SearchInput";
import { debounce } from "lodash";
import {
  colorFilterIcon,
  colorSortDownIcon,
  colorSortUpIcon,
} from "../../utils";
import ModalViewJobPosting from "./ModalViewJobPosting";

const JobPostManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalViewJobPosting, setOpenModalViewJobPosting] =
    useState<boolean>(false);

  const [data, setData] = useState<IJobPostingRes[]>([]);
  const [filteredData, setFilteredData] = useState<IJobPostingRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<IJobPostingRes | null>(null);

  const fetchJobPost = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<IJobPostingRes[]> =
        await postJobService.getAllPostJob();
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
    fetchJobPost();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearch) ||
          item.profession.toLowerCase().includes(lowerSearch) ||
          item.city.toLowerCase().includes(lowerSearch),
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
    if (e) {
      try {
        setLoading(true);
        const res: ApiResponse<IJobPostingRes> =
          await postJobService.confirmPostJob(id);
        if (res && res.success) {
          fetchJobPost();
          toast.success(
            res.message || "Công việc đã được xác nhận và kích hoạt.",
          );
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        fetchJobPost();
      }
    } else {
      try {
        setLoading(true);
        const res: ApiResponse<IJobPostingRes> =
          await postJobService.blockPostJob(id);
        if (res && res.success) {
          toast.success(
            res.message || "Công việc đã được hủy xác nhận và vô hiệu hóa.",
          );
          fetchJobPost();
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        fetchJobPost();
      }
    }
    setLoading(false);
  };

  const handleDeleteJobPosting = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<IJobPostingRes> =
        await postJobService.deletePostJob(id);
      if (res && res.success) {
        fetchJobPost();
        toast.success("Công việc được xóa thành công");
      }
      if (res && !res.success) {
        if (res.error && typeof res.error === "string") toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      fetchJobPost();
    }
    setLoading(false);
  };

  const columns: TableProps<IJobPostingRes>["columns"] = [
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
      title: "Tên công việc",
      dataIndex: "title",
      key: "title",
      width: "15%",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "profession",
      key: "profession",
      width: "15%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nơi làm việc",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "last_date",
      key: "last_date",
      sorter: (a, b) =>
        new Date(a.last_date).getTime() - new Date(b.last_date).getTime(),
      sortIcon: ({ sortOrder }) => (
        <div className="flex flex-col text-[10px]">
          <CaretUpFilled style={{ color: colorSortUpIcon(sortOrder) }} />
          <CaretDownFilled style={{ color: colorSortDownIcon(sortOrder) }} />
        </div>
      ),
      render: (last_date: string) => (
        <span>
          {new Date(last_date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Đánh dấu",
      dataIndex: "featured",
      key: "featured",
      width: "9%",
      filters: [
        { text: "Nổi bật", value: 1 },
        { text: "Bình thường", value: 0 },
      ],
      filterIcon: (filtered: boolean) => (
        <TbFilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value, record) => record.featured === value,
      render: (featured: number) => (
        <Tag color={featured === 1 ? "success" : "error"}>
          {featured === 1 ? "Nổi bật" : "Bình thường"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "9%",
      filters: [
        { text: "Đã xác nhận", value: 1 },
        { text: "Đã hủy", value: 0 },
      ],
      filterIcon: (filtered: boolean) => (
        <TbFilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value, record) => record.status === value,
      render: (status: number) => (
        <Tag color={status === 1 ? "success" : "error"}>
          {status === 1 ? "Đã xác nhận" : "Đã hủy"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record: IJobPostingRes) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <button
              onClick={() => {
                setDataDetail(record);
                setOpenModalViewJobPosting(true);
              }}
              className="text-xl text-blue-500"
            >
              <FaEye />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa công việc này?"
            description="Bạn có chắc chắn muốn xóa công việc này không?"
            onConfirm={() => {
              handleDeleteJobPosting(record.id);
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
              record?.status === 1
                ? "Vô hiệu hóa công việc"
                : "Kích hoạt công việc"
            }
          >
            <Switch
              className="mb-1.5"
              size="small"
              checked={record.status === 1 ? true : false}
              onChange={(e) => {
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
        {/* <ButtonAdd
          title="Thêm tài khoản"
          onClick={() => {
            setOpenModalCreateEditSeeker(true);
          }}
        /> */}
      </div>
      <Table<IJobPostingRes>
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
          onShowSizeChange(_, size) {
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
      <ModalViewJobPosting
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        openModalViewJobPosting={openModalViewJobPosting}
        setOpenModalViewJobPosting={setOpenModalViewJobPosting}
      />
    </div>
  );
};

export default JobPostManagement;
