import { ReactNode } from "react";
interface LayoutContentProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <div className="min-h-screen rounded-xl border border-solid border-gray-200 bg-white p-3">
      {children}
    </div>
  );
};

export default LayoutContent;
