import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

export const ScrollToTop = () => {
  const pageConntext = usePageContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
