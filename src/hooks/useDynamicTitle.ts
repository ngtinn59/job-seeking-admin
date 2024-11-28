import { useEffect } from "react";

const useDynamicTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDynamicTitle;
