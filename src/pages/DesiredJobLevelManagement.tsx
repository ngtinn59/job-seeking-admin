import ManageDesiredPosition from "../features/recruiment/desired-position/ManageDesiredPosition";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const DesiredJobLevelManagement: React.FC = () => {
  useDynamicTitle("Quản lý trình độ mong muốn");
  return (
    <>
      <div className="title_page">Quản lý cấp bậc mong muốn</div>
      <LayoutContent>
        <ManageDesiredPosition />
      </LayoutContent>
    </>
  );
};

export default DesiredJobLevelManagement;
