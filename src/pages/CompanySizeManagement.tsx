import SizeCompanyManagement from "../features/company/size-company/SizeCompanyManagement";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const CompanySizeManagement: React.FC = () => {
  useDynamicTitle("Quản lý quy mô công ty");
  return (
    <>
      <div className="title_page">Quản lý quy mô công ty</div>
      <LayoutContent>
        <SizeCompanyManagement />
      </LayoutContent>
    </>
  );
};

export default CompanySizeManagement;
