import ManageDistrict from "../features/location/district/ManageDistrict";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const DistrictManagement: React.FC = () => {
  useDynamicTitle("Quản lý quận huyện");
  return (
    <>
      <div className="title_page">Quản lý quận huyện</div>
      <LayoutContent>
        <ManageDistrict />
      </LayoutContent>
    </>
  );
};

export default DistrictManagement;
