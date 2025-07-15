import DashboardSidebar from "../DashboardComponent/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="relative">
      {/* <Header /> */}
      <DashboardSidebar></DashboardSidebar>
      <main className="ml-[60px] pt-20 px-6 min-h-screen bg-gray-100">
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default DashboardLayout;
