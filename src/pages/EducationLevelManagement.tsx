import ManageEducation from "../features/recruiment/education/ManageEducation";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const EducationLevelManagement: React.FC = () => {
  useDynamicTitle("Quản lý trình độ học vấn");
  return (
    <>
      <div className="title_page">Quản lý cấp độ học</div>
      <LayoutContent>
        <ManageEducation />
      </LayoutContent>
    </>
  );
};
export default EducationLevelManagement;
