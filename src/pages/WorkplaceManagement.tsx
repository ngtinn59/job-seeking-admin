import WorkplaceListManagement from "../features/company/workplace/WorkplaceListManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const WorkplaceManagement: React.FC = () => {
  useDynamicTitle("Quản lý nơi làm việc");
  return (
    <>
      <div className="title_page">Quản lý nơi làm việc</div>
      <LayoutContent>
        <WorkplaceListManagement />
      </LayoutContent>
    </>
  );
};

export default WorkplaceManagement;
