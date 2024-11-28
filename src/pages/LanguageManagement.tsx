import ManageLanguage from "../features/recruiment/language/ManageLanguage";
import { useDynamicTitle } from "../hooks";
import LayoutContent from "../layouts/LayoutContent";

const LanguageManagement: React.FC = () => {
  useDynamicTitle("Quản lý ngôn ngữ");
  return (
    <>
      <div className="title_page">Quản lý ngôn ngữ</div>
      <LayoutContent>
        <ManageLanguage />
      </LayoutContent>
    </>
  );
};

export default LanguageManagement;
