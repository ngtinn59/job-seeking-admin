import CompanyListManagement from "../features/company/mange-company/CompanyListManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const CompanyManagement: React.FC = () => {
  useDynamicTitle("Quản lý công ty");
  return (
    <>
      <div className="title_page">Quản lý công ty</div>
      <LayoutContent>
        <CompanyListManagement />
      </LayoutContent>
    </>
  );
};

export default CompanyManagement;
