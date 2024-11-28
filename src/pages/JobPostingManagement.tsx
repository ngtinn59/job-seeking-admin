import JobPostManagement from "../features/job-post/JobPostManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const JobPostingManagement: React.FC = () => {
  useDynamicTitle("Quản lý đăng tuyển");
  return (
    <>
      <div className="title_page">Quản lý đăng tuyển</div>
      <LayoutContent>
        <JobPostManagement />
      </LayoutContent>
    </>
  );
};

export default JobPostingManagement;
