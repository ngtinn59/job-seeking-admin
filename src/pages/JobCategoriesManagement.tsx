import ManageProfession from "../features/recruiment/profession/ManageProfession";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const JobCategoriesManagement: React.FC = () => {
  useDynamicTitle("Quản lý nghề nghiệp");
  return (
    <>
      <div className="title_page">Quản lý nghề nghiệp</div>
      <LayoutContent>
        <ManageProfession />
      </LayoutContent>
    </>
  );
};

export default JobCategoriesManagement;
