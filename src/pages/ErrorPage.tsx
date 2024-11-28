import { BiSolidError } from "react-icons/bi";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { useDynamicTitle } from "../hooks";

const ErrorPage: React.FC = () => {
  useDynamicTitle("Error");
  const routeError = useRouteError();
  const navigate = useNavigate();
  let errorMessage: string;

  if (isRouteErrorResponse(routeError)) {
    errorMessage = routeError.data;
  } else if (routeError instanceof Error) {
    errorMessage = routeError.message;
  } else if (typeof routeError === "string") {
    errorMessage = routeError;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <BiSolidError className="text-9xl text-red-500" />
        <p className="text-xl font-semibold">Oops! Something went wrong.</p>

        <p className="my-4">{errorMessage}</p>

        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={() => navigate("/")}
        >
          <p>Trở về trang chủ</p>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
