import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Toaster } from "react-hot-toast";
import { PRIMARY_COLOR, VIETNAM_TIMEZONE } from "./interfaces/common/constants";
import AppRouter from "./router/AppRouter";
import { store } from "./redux/store";
import LoadingBar from "react-top-loading-bar";
import { loadingBarRef } from "./services/api-client";

dayjs.locale("vi");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.tz.setDefault(VIETNAM_TIMEZONE);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: PRIMARY_COLOR,
        },
        components: {
          Table: {
            headerBg: PRIMARY_COLOR,
            headerColor: "#fff",
            headerSortActiveBg: PRIMARY_COLOR,
            headerSortHoverBg: PRIMARY_COLOR,
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AppRouter />
        </Provider>
      </QueryClientProvider>
      <LoadingBar color="#2C75E7" ref={loadingBarRef} />
      <Toaster
        position="top-center"
        containerStyle={{
          marginTop: "0.25rem",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "1rem",
            padding: "0.75rem 1rem",
          },
        }}
      />
    </ConfigProvider>
  );
}
export default App;
