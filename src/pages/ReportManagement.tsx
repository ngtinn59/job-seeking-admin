import ManageReport from "../features/report/ManageReport";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const ReportManagement: React.FC = () => {
  useDynamicTitle("Báo cáo");
  return (
    <>
      <div className="title_page">Báo cáo</div>
      <LayoutContent>
        <ManageReport />
      </LayoutContent>
    </>
  );
};

export default ReportManagement;
