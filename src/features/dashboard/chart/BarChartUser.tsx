import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartUserProps {
  monthlyData: number[];
  year: number;
}

const BarChartUser: React.FC<BarChartUserProps> = ({ monthlyData, year }) => {
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: `New User ${year}`,
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `New User ${year}`,
        align: "start" as const,
        font: {
          size: 19,
          weight: "bold" as const,
        },
        padding: {
          left: 50,
          top: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <Bar
      className="bg-white p-3 shadow-lg"
      style={{
        minWidth: "100%",
        minHeight: "100%",
      }}
      data={data}
      options={options}
    />
  );
};

export default BarChartUser;
