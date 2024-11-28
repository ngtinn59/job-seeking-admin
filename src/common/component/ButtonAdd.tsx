import { IoAddCircleOutline } from "react-icons/io5";

interface ButtonAddProps {
  onClick: () => void;
  title: string;
}

const ButtonAdd: React.FC<ButtonAddProps> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-lg bg-[#275DE3] px-2.5 py-2 text-white transition duration-200 ease-in-out hover:ring-1 hover:ring-[#3a6fed]`}
    >
      <IoAddCircleOutline className="text-lg" />
      {title}
    </button>
  );
};

export default ButtonAdd;
