import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { IAuthRequest, IAuthRes } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { loginFailed, loginSuccess } from "../../redux/auth";
import axios from "axios";
import { authService } from "../../services";

const LoginForm: React.FC = () => {
  const [loginForm] = Form.useForm<IAuthRequest>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = window.localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFinish = async (values: IAuthRequest) => {
    try {
      const res: IAuthRes = await authService.login(values);
      if (res && res.success) {
        window.localStorage.setItem("access_token", res.access_token || "");
        dispatch(loginSuccess(res));
        navigate("/");
        toast.success("Đăng nhập thành công");
      } else {
        if (res.error) {
          const errorMessages = Object.values(res.error).flat().join(", ");
          toast.error(errorMessages || "Sai thông tin đăng nhập");
        }
        dispatch(loginFailed());
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverError = error.response.data;
        const errorMessages = Object.values(serverError.error || {})
          .flat()
          .join(", ");
        toast.error(errorMessages || "Sai thông tin đăng nhập");
      } else {
        toast.error("Có lỗi xảy ra khi kết nối tới server.");
      }
      dispatch(loginFailed());
    }
  };

  return (
    <>
      <Form
        className="flex flex-col"
        onFinish={onFinish}
        form={loginForm}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input allowClear prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
        >
          <Input.Password
            allowClear
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="focus:shadow-outline mt-2 w-full rounded bg-blue-700 py-2 font-bold text-white hover:bg-blue-900 focus:outline-none"
          >
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
