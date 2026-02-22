import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | StudyNotion`;
  }, [title]);
};

export default usePageTitle;
