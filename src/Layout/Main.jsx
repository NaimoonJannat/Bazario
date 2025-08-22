import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";

const Main = () => {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/registration"];

  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {/* Show navbar and sidebar only if not login/register route */}
      {!isNoLayoutRoute && <Navbar2 />}
      {!isNoLayoutRoute && <Sidebar />}

      {/* Main content */}
      <div className="min-h-[calc(100vh-306px)] bg-[#001f3f] p-4 md:pt-24">
        <Outlet />
      </div>

      {/* Show footer only if not login/register route */}
      {!isNoLayoutRoute && <Footer />}
    </div>
  );
};

export default Main;
