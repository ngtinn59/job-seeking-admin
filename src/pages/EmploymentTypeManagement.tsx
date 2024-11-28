import ManageEmploymentType from "../features/recruiment/employment-type/ManageEmploymentType";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const EmploymentTypeManagement: React.FC = () => {
  useDynamicTitle("Quản lý loại hình công việc");
  return (
    <>
      <div className="title_page">Quản lý hình thức làm việc</div>
      <LayoutContent>
        <ManageEmploymentType />
      </LayoutContent>
    </>
  );
};

export default EmploymentTypeManagement;
