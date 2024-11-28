import { useCallback, useEffect, useState } from "react";
import { companiesService } from "../../../services";
import { ApiResponse, ICompanyRes } from "../../../interfaces";
import { Avatar, Popconfirm, Space, Switch, Table, Tag, Tooltip } from "antd";
import { FaEye } from "react-icons/fa";
import type { TableProps } from "antd";
import { MdDelete } from "react-icons/md";
import { TbFilterFilled } from "react-icons/tb";
import toast from "react-hot-toast";
import SearchInput from "../../../common/component/SearchInput";
import { debounce } from "lodash";
import { colorFilterIcon } from "../../../utils";
import ModalViewCompany from "./ModalViewCompany";
import { CiImageOn } from "react-icons/ci";

const CompanyListManagement: React.FC = () => {
  const LIMIT = 10;

  const [openModalViewCompany, setOpenModalViewCompany] =
    useState<boolean>(false);

  const [data, setData] = useState<ICompanyRes[]>([]);
  const [filteredData, setFilteredData] = useState<ICompanyRes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [dataDetail, setDataDetail] = useState<ICompanyRes | null>(null);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyRes[]> =
        await companiesService.getAllCompanies();
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
    fetchCompany();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.company_email.toLowerCase().includes(lowerSearch) ||
          item.name.toLowerCase().includes(lowerSearch) ||
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
        const res: ApiResponse<ICompanyRes> =
          await companiesService.rateCompany(id);
        if (res && res.success) {
          fetchCompany();
          toast.success(
            res.message || "Công ty đã được đánh dấu nổi bật thành công",
          );
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        fetchCompany();
      }
    }
    if (!e) {
      try {
        setLoading(true);
        const res: ApiResponse<ICompanyRes> =
          await companiesService.unrateCompany(id);
        if (res && res.success) {
          fetchCompany();
          toast.success(
            res.message || "Công ty đã được bỏ đánh dấu nổi bật thành công",
          );
        }
        if (res && !res.success) {
          if (res.error && typeof res.error === "string")
            toast.error(res.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        fetchCompany();
      }
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    setLoading(true);
    try {
      const res: ApiResponse<ICompanyRes> =
        await companiesService.deleteCompany(id);
      if (res && res.success) {
        fetchCompany();
        toast.success("Công ty đã được xóa thành công");
      }
      if (res && !res.success) {
        toast.error(res.message || "Xóa công ty không thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
      fetchCompany();
    }
    setLoading(false);
  };

  const columns: TableProps<ICompanyRes>["columns"] = [
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
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 80,
      align: "center",
      render: (logo: string) => (
        <Avatar shape="square" size="large" src={logo} icon={<CiImageOn />} />
      ),
    },
    {
      title: "Tên công ty",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "company_email",
      key: "company_email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Đánh dấu",
      dataIndex: "is_hot",
      key: "is_hot",
      width: "9%",
      filters: [
        { text: "Nổi bật", value: 1 },
        { text: "Bình thường", value: 0 },
      ],
      filterIcon: (filtered: boolean) => (
        <TbFilterFilled style={{ color: colorFilterIcon(filtered) }} />
      ),
      onFilter: (value, record) => record.is_hot === value,
      render: (featured: number) => (
        <Tag color={featured === 1 ? "success" : "error"}>
          {featured === 1 ? "Nổi bật" : "Bình thường"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      align: "center",
      render: (_, record: ICompanyRes) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <button
              onClick={() => {
                setDataDetail(record);
                setOpenModalViewCompany(true);
              }}
              className="text-xl text-blue-500"
            >
              <FaEye />
            </button>
          </Tooltip>
          <Popconfirm
            title="Xóa công ty này?"
            description="Bạn có chắc chắn muốn xóa công ty này?"
            onConfirm={() => {
              handleDeleteCompany(record.id);
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
              record?.is_hot
                ? "Công ty đã được đánh dấu nổi bật"
                : "Đánh dấu nổi bật"
            }
          >
            <Switch
              className="mb-1.5"
              size="small"
              checked={record?.is_hot === 1 ? true : false}
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
      <Table<ICompanyRes>
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
      <ModalViewCompany
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        openModalViewCompany={openModalViewCompany}
        setOpenModalViewCompany={setOpenModalViewCompany}
      />
    </div>
  );
};

export default CompanyListManagement;
