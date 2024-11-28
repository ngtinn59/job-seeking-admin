import SeekerManagement from "../features/user/seeker/SeekerManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const JobSeekerManagement: React.FC = () => {
  useDynamicTitle("Quản lý tài khoản người dùng");
  return (
    <>
      <div className="title_page">Quản lý tài khoản người dùng</div>
      <LayoutContent>
        <SeekerManagement />
      </LayoutContent>
    </>
  );
};

export default JobSeekerManagement;
