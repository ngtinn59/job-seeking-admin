import React, { useEffect, useState } from "react";
import axios from "axios";
import StatisticCard from "./StatisticCard";
import { FaUserAlt } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { BsFillPostcardFill } from "react-icons/bs";
import { RiFileUserFill } from "react-icons/ri";

const CartList: React.FC = () => {
  const [statistics, setStatistics] = useState({
    total_users: 0,
    active_jobs: 0,
    total_companies: 0,
    total_employer: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API trong useEffect
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://101.101.96.43/api/statistic"); // Thay "API_ENDPOINT" bằng URL API của bạn
        const data = response.data.data; // Lấy dữ liệu từ response
        setStatistics({
          total_users: data.Job_Seekers,
          active_jobs: data.active_jobs,
          total_companies: data.total_companies,
          total_employer: data.total_employer,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load statistics.");
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <StatisticCard
        title="Job Seekers"
        value={statistics.total_users}
        change={0}
        isPositive={true}
        icon={<FaUserAlt className="text-2xl text-red-500" />}
      />
      <StatisticCard
        title="Employers"
        value={statistics.total_employer}
        change={0}
        isPositive={true}
        icon={<MdPersonSearch className="text-4xl text-orange-500" />}
      />
      <StatisticCard
        title="Job Post"
        value={statistics.active_jobs}
        change={0}
        isPositive={true}
        icon={<BsFillPostcardFill className="text-3xl text-yellow-400" />}
      />
      <StatisticCard
        title="Companies"
        value={statistics.total_companies}
        change={0}
        isPositive={true}
        icon={<RiFileUserFill className="text-3xl text-purple-500" />}
      />
    </>
  );
};

export default CartList;
