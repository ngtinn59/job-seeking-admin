import TypeCompanyManagement from "../features/company/type-company/TypeCompanyManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const CompanyTypeManagement: React.FC = () => {
  useDynamicTitle("Quản lý loại hình công ty");
  return (
    <>
      <div className="title_page">Quản lý loại công ty</div>
      <LayoutContent>
        <TypeCompanyManagement />
      </LayoutContent>
    </>
  );
};

export default CompanyTypeManagement;
