import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
