import BarChartUser from "./BarChartUser";

const ChartList: React.FC = () => {
  return (
    <>
      <div className="">
        <BarChartUser
          monthlyData={[12, 19, 8, 15, 20, 30, 45, 40, 25, 18, 28, 33]}
          year={2024}
        />
      </div>
      <div className="">
        <BarChartUser
          monthlyData={[12, 19, 8, 15, 20, 30, 45, 40, 25, 18, 28, 33]}
          year={2024}
        />
      </div>
      <div className="">
        <BarChartUser
          monthlyData={[12, 19, 8, 15, 20, 30, 45, 40, 25, 18, 28, 33]}
          year={2024}
        />
      </div>
      <div className="">
        <BarChartUser
          monthlyData={[12, 19, 8, 15, 20, 30, 45, 40, 25, 18, 28, 33]}
          year={2024}
        />
      </div>
    </>
  );
};

export default ChartList;
