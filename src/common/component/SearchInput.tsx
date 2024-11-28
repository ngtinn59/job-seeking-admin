import { MdSearch } from "react-icons/md";

interface SearchInputProps {
  searh: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searh,
  setSearch,
  placeholder = "Tìm kiếm",
}) => {
  return (
    <div className="relative h-full">
      <input
        type="text"
        value={searh}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className="pr-4.5 mr-8 w-60 rounded-lg border border-solid border-blue-500 px-2.5 py-2 outline-none"
      />
      <button className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-e-lg border-blue-500 bg-blue-500 text-xl text-white">
        <MdSearch />
      </button>
    </div>
  );
};

export default SearchInput;
