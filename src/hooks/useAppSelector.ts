import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../redux/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
