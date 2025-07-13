// import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";
import Navbar2 from "../Components/Navbar2";

const Main = () => {
    return (
        <div>
            {/* Navbar */}
            {/* <Navbar></Navbar> */}
            <Navbar2></Navbar2>
            {/* outlet */}
            <div className="min-h-[calc(100vh-306px)] bg-[#001f3f]">
                <Outlet></Outlet>
            </div>
            {/* footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;