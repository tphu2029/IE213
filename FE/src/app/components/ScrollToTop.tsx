import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi đường dẫn thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
