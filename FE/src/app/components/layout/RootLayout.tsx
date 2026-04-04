import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import ScrollToTop from "../ScrollToTop";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
