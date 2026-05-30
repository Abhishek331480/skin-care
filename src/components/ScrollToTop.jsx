import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const adminContainer = document.getElementById("admin-scroll-container");

    if (adminContainer) {
      adminContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;