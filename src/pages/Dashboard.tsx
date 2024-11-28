import ChartList from "../features/dashboard/chart/ChartList";
import StatisticCardList from "../features/dashboard/statistic/StatisticCardList";
import { useDynamicTitle } from "../hooks";

const Dashboard: React.FC = () => {
  useDynamicTitle("Dashboard");
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatisticCardList />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <ChartList />
      </div>
    </div>
  );
};

export default Dashboard;
