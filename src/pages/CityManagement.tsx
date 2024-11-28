import ManageCity from "../features/location/city/ManageCity";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const CityManagement: React.FC = () => {
  useDynamicTitle("Quản lý thành phố");
  return (
    <>
      <div className="title_page">Quản lý thành phố</div>
      <LayoutContent>
        <ManageCity />
      </LayoutContent>
    </>
  );
};

export default CityManagement;
