import ManageCountry from "../features/location/country/ManageCountry";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const CountryManagement: React.FC = () => {
  useDynamicTitle("Quản lý quốc gia");
  return (
    <>
      <div className="title_page">Quản lý quốc gia</div>
      <LayoutContent>
        <ManageCountry />
      </LayoutContent>
    </>
  );
};

export default CountryManagement;
