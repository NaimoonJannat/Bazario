import { Outlet } from "react-router";
import DashboardSidebar from "../DashboardComponent/DashboardSidebar";
import Loader from "../../../../Components/Loader";



const DashboardLayout = () => {
  return (
    <div className="relative">
      {/* <Header /> */}
      <DashboardSidebar></DashboardSidebar>
      <main className="ml-[60px] pt-20 px-6 min-h-screen bg-gray-300">
      <Outlet />
     
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default DashboardLayout;
