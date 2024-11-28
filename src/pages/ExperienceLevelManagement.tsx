import ManageExperience from "../features/recruiment/experience/ManageExperience";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const ExperienceLevelManagement: React.FC = () => {
  useDynamicTitle("Quản lý trình độ kinh nghiệm");
  return (
    <>
      <div className="title_page">Quản lý số năm kinh nghiệm</div>
      <LayoutContent>
        <ManageExperience />
      </LayoutContent>
    </>
  );
};

export default ExperienceLevelManagement;
