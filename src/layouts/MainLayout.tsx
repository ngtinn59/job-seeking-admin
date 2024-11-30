import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { CgLogOut } from "react-icons/cg";
import { FaCity, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaEarthAsia, FaLocationDot, FaTreeCity } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoBusiness } from "react-icons/io5";
import { MdDashboard, MdPersonSearch, MdWork } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import toast from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../redux/auth";
import { PRIMARY_COLOR } from "../interfaces/common/constants";
import { NotifcationIcon } from "../features/notifications/NotificationIcon";

const { Header, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { name, success, access_token } = useAppSelector(
    (state) => state.user.account,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!success && !access_token) {
      window.localStorage.removeItem("access_token");
      navigate("/login");
    }
  }, [success, access_token, navigate]);

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    location.pathname === "/"
      ? ["dashboard"]
      : location.pathname.slice(1).split("/"),
  );
  const menuItems: MenuProps["items"] = [
    {
      label: <NavLink to="/">Dashboard</NavLink>,
      key: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: <NavLink to="/report-management">Báo cáo</NavLink>,
      key: "bao-cao",
      icon: <TbReportSearch />,
    },
    {
      label: "Quản lý người dùng",
      key: "quan-ly-nguoi-dung",
      icon: <FaUserAlt />,
      children: [
        {
          label: (
            <NavLink to="/job-seeker-management">Tài khoản người dùng</NavLink>
          ),
          key: "/job-seeker-management",
        },
      ],
    },
    {
      label: "Quản lý đăng tuyển",
      key: "quan-ly-dang-tuyen",
      icon: <MdPersonSearch />,
      children: [
        {
          label: (
            <NavLink to="/job-posting-management">Công việc đăng tuyển</NavLink>
          ),
          key: "/job-posting-management",
        },
      ],
    },
    {
      label: "Quản lý công ty",
      key: "quan-ly-cong-ty",
      icon: <IoBusiness />,
      children: [
        {
          label: <NavLink to="/company-management">Công ty</NavLink>,
          key: "/company-management",
        },
        {
          label: (
            <NavLink to="/company-type-management">Loại hình công ty</NavLink>
          ),
          key: "/company-type-management",
        },
        {
          label: (
            <NavLink to="/company-size-management">Quy mô công ty</NavLink>
          ),
          key: "/company-size-management",
        },
        {
          label: <NavLink to="/workplace-management">Nơi làm việc</NavLink>,
          key: "/workplace-management",
        },
      ],
    },
    {
      label: "Quản lý tuyển dụng",
      key: "quan-ly-tuyen-dung",
      icon: <MdWork />,
      children: [
        {
          label: <NavLink to="/language-management">Ngôn ngữ</NavLink>,
          key: "/language-management",
        },
        {
          label: <NavLink to="/job-categories-management">Nghề nghiệp</NavLink>,
          key: "/job-categories-management",
        },
        {
          label: (
            <NavLink to="/employment-type-management">
              Hình thức làm việc
            </NavLink>
          ),
          key: "/employment-type-management",
        },
        {
          label: (
            <NavLink to="/education-level-management">Trình độ học vấn</NavLink>
          ),
          key: "/education-level-management",
        },
        {
          label: (
            <NavLink to="/desired-job-level-management">
              Cấp bậc mong muốn
            </NavLink>
          ),
          key: "/desired-job-level-management",
        },
        {
          label: (
            <NavLink to="/experience-level-management">
              Số năm kinh nghiệm
            </NavLink>
          ),
          key: "/experience-level-management",
        },
      ],
    },
    {
      label: "Quản lý địa điểm",
      key: "quan-ly-dia-diem",
      icon: <FaLocationDot />,
      children: [
        {
          label: <NavLink to="/country-management">Quốc gia</NavLink>,
          key: "/country-management",
          icon: <FaEarthAsia />,
        },
        {
          label: <NavLink to="/city-management">Thành phố</NavLink>,
          key: "/city-management",
          icon: <FaCity />,
        },
        {
          label: <NavLink to="/district-management">Quận, huyện</NavLink>,
          key: "/district-management",
          icon: <FaTreeCity />,
        },
      ],
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <NavLink to="/profile-management">Hồ sơ</NavLink>,
      icon: <FaUserAlt />,
    },
    {
      key: "setting",
      label: <NavLink to="/setting-management">Cài đặt</NavLink>,
      icon: <IoMdSettings />,
    },
    {
      key: "logout",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("access_token");
            toast.success("Đăng xuất thành công");
            dispatch(logout());
          }}
        >
          Đăng xuất
        </span>
      ),
      icon: <CgLogOut />,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    scrollbarColor: "black",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle: React.CSSProperties = {
    background: colorBgContainer,
    padding: 0,
    zIndex: 1,
    overflow: "auto",
    position: "fixed",
    insetInlineStart: collapsed ? 80 : 230,
    top: 0,
    right: 0,
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Sider
          style={siderStyle}
          trigger={null}
          collapsible
          width={230}
          collapsed={collapsed}
          theme="light"
        >
          <div className="demo-logo-vertical flex flex-col items-center">
            <img src="/brand_logo.svg" alt="Logo" className="w-28 p-3" />

            {!collapsed && (
              <h1
                style={{ color: PRIMARY_COLOR }}
                className={`font-bold uppercase`}
              >
                Trang quản trị
              </h1>
            )}
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={({ key }) => {
              setSelectedKeys([key]);
            }}
          />
        </Sider>

        <Layout
          style={{ marginInlineStart: collapsed ? 80 : 230 }}
          className="transition-all duration-200"
        >
          <Header
            style={headerStyle}
            className="shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <Button
                type="text"
                icon={
                  collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "20px",
                }}
              />

              <div className="relative mr-5 flex cursor-pointer items-center">
                <NotifcationIcon />
                <Dropdown
                  menu={{ items }}
                  placement="bottom"
                  overlayStyle={{
                    position: "absolute",
                    top: "50px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-medium uppercase">{name}</p>
                    <Button
                      type="text"
                      icon={<FaUserCircle />}
                      style={{
                        fontSize: "30px",
                      }}
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>

          <Layout.Content>
            <div className="m-3 mt-[76px]">
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
