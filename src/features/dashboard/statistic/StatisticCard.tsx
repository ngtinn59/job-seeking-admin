import { FC } from "react";

interface StatisticCardProps {
  title?: string;
  icon?: React.ReactNode;
  value?: number | string;
  change?: number;
  isPositive?: boolean;
  background?: string;
}

const StatisticCard: FC<StatisticCardProps> = ({
  title,
  icon,
  value,
  change,
  isPositive,
  background = "bg-white",
}) => {
  return (
    <div className={`rounded-lg ${background} p-3.5 text-gray-900 shadow-md`}>
      <div className="flex items-center justify-between text-2xl font-semibold">
        <span className="text-2xl">{value}</span>
      </div>
      <div
        className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"} mt-1.5`}
      >
        {isPositive ? "+" : ""}
        {change}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-lg font-medium uppercase">{title}</span>
        <span>{icon}</span>
      </div>
    </div>
  );
};

export default StatisticCard;
